'use client';
import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

interface LoadingContextValue {
  isLoading: boolean;
  register: (key: string) => void;
  unregister: (key: string) => void;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

// Safety valve: if something registers but never unregisters (a bug, a
// thrown error outside the promise chain, etc.), don't let the overlay get
// stuck forever — force it to clear after this long.
const FAILSAFE_MS = 8000;

/**
 * Tracks how many components on the current page are still fetching data.
 * The splash overlay (see Initializing) stays visible until every component
 * that called register() has called unregister() back.
 *
 * Defaults to NOT loading. Pages with no data-fetching components (the admin
 * dashboard, the login page) simply never show the overlay — there's nothing
 * to wait for. Only pages whose components actively call register() will
 * show it, for as long as something is actually pending.
 */
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pendingRef = useRef<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  // Reset synchronously during render when the route changes — not in a
  // useEffect. This matters: child components' effects (which call
  // register()) can fire before a parent's own effect, so an effect-based
  // reset here could wipe out a real, just-started registration. Adjusting
  // state during render like this is a React-sanctioned pattern for exactly
  // this "reset derived state when a prop changes" case, and it runs before
  // any effects for this commit, avoiding that race entirely.
  const lastPathnameRef = useRef(pathname);
  if (lastPathnameRef.current !== pathname) {
    lastPathnameRef.current = pathname;
    pendingRef.current = new Set();
    if (isLoading) setIsLoading(false);
  }

  const recompute = useCallback(() => {
    setIsLoading(pendingRef.current.size > 0);
  }, []);

  const register = useCallback((key: string) => {
    pendingRef.current.add(key);
    recompute();
  }, [recompute]);

  const unregister = useCallback((key: string) => {
    pendingRef.current.delete(key);
    recompute();
  }, [recompute]);

  // Failsafe: force-clear if something's been pending too long.
  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(() => {
      if (pendingRef.current.size > 0) {
        console.warn(
          "Loading overlay force-cleared after timeout. Pending keys:",
          Array.from(pendingRef.current)
        );
        pendingRef.current = new Set();
        setIsLoading(false);
      }
    }, FAILSAFE_MS);
    return () => clearTimeout(t);
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, register, unregister }}>
      {children}
    </LoadingContext.Provider>
  );
}

/**
 * Usage in any component that fetches page-critical data:
 *
 *   const { register, unregister } = useLoading();
 *   useEffect(() => {
 *     const key = "unique-name";
 *     register(key);
 *     fetchSomething().then(setData).finally(() => unregister(key));
 *   }, []);
 */
export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within LoadingProvider");
  return ctx;
}
