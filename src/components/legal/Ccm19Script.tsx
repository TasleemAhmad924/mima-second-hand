import { ccm19ScriptSrc } from "@/config/ccm19";

/**
 * Native head script, not next/script.
 *
 * CCM19 must run before other page scripts so it can block them until
 * consent. `beforeInteractive` currently only queues the tag via
 * `self.__next_s`, which is too late for a consent manager.
 *
 * Do not let the dashboard block unknown inline scripts, and add an
 * exception for `self.__next_f` if it still intercepts the RSC payload.
 */
export function Ccm19Script() {
  return <script src={ccm19ScriptSrc()} referrerPolicy="origin" />;
}
