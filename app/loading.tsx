'use client';

import { useEffect, useState } from "react";

const Loading = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (hasVisited) {
      // ✅ defer update (fixes warning)
      setTimeout(() => {
        setLoading(false);
      }, 0);
      return;
    }

    const timer = setTimeout(() => {
      localStorage.setItem("hasVisited", "true");
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-gray-300 animate-pulse">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;