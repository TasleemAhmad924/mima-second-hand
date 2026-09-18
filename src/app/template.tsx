import type { ReactNode } from "react";

/**
 * Next.js remounts `template` on every navigation. A fade-in used to start
 * at opacity 0 in the server HTML. CCM19 can block the RSC payload
 * (`self.__next_f`), so that fade never ran and the page stayed blank under
 * the header. Keep this shell visible — section reveals handle motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  return children;
}
