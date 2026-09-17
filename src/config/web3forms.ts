/**
 * Public Web3Forms embed. This is not a server secret.
 *
 * Web3Forms documents the access key as a client-side form id. Do not confuse
 * it with PLADSLY_API_KEY. Submissions must go from the browser to
 * api.web3forms.com (server-side posting needs a paid plan and IP allowlisting).
 */
const DEFAULT_ACCESS_KEY = "bdd450f2-e0e0-4194-8e63-0093e484b60c";
const SUBMIT_URL = "https://api.web3forms.com/submit";

function readPublic(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : fallback;
}

export const web3forms = {
  accessKey: readPublic(
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
    DEFAULT_ACCESS_KEY,
  ),
  submitUrl: SUBMIT_URL,
} as const;
