import { cacheLife } from "next/cache";

/**
 * Cached dynamic year component compliant with Next.js 16 Cache Components.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
