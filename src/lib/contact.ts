import { siteConfig } from "@/config/site";
import { web3forms } from "@/config/web3forms";

/**
 * Contact form transport.
 *
 * The presentation (form, validation, states) stays separate from delivery.
 * Messages are posted from the browser to Web3Forms, which emails the shop.
 */

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  /** Honeypot. When true, nothing is sent. */
  botcheck?: boolean;
}

export interface ContactTransport {
  /** Resolves once the message has been handed off. */
  send(message: ContactMessage): Promise<void>;
}

function isWeb3FormsSuccess(payload: unknown, status: number): boolean {
  if (status === 429 || status >= 500) return false;
  if (!payload || typeof payload !== "object") return status === 200;
  const record = payload as Record<string, unknown>;
  if (record.success === false) return false;
  if (record.success === true) return true;
  return status === 200;
}

const web3formsTransport: ContactTransport = {
  async send(message) {
    if (message.botcheck) return;

    const formData = new FormData();
    formData.append("access_key", web3forms.accessKey);
    formData.append("name", message.name);
    formData.append("email", message.email);
    formData.append("message", message.message);
    formData.append("subject", `Nachricht über die Website – ${message.name}`);
    formData.append("from_name", siteConfig.name);

    const response = await fetch(web3forms.submitUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    let payload: unknown = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!isWeb3FormsSuccess(payload, response.status)) {
      throw new Error("web3forms_failed");
    }
  },
};

export const contactTransport: ContactTransport = web3formsTransport;
