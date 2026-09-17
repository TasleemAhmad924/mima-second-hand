import { ccm19ScriptSrc } from "@/config/ccm19";

/**
 * Native head script, not next/script.
 *
 * CCM19 must run before other page scripts so it can block them until
 * consent. `beforeInteractive` currently only queues the tag via
 * `self.__next_s`, which is too late for a consent manager.
 */
export function Ccm19Script() {
  return <script src={ccm19ScriptSrc()} referrerPolicy="origin" />;
}
