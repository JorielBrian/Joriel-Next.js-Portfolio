import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  images: {
    // next/image refuses to load any external domain unless it's listed
    // here — this is what was missing, not anything wrong with the icon URL itself.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
    // Next.js blocks SVGs from the image optimizer by default — an SVG can
    // technically embed a <script> tag, so it treats them as unsafe unless
    // told otherwise. Simple Icons is a well-known, trusted source, so
    // allowing it here is reasonable. The CSP below is a belt-and-suspenders
    // safety net: even if an SVG somehow did contain a script, this policy
    // stops it from executing or reaching anywhere.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
 
export default nextConfig;