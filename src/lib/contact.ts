import { siteConfig } from "@/config/site";

/**
 * Contact form transport.
 *
 * The presentation (form, validation, states) is fully separated from how a
 * message is actually delivered. Because this is a static frontend with no
 * backend, the default transport composes a real `mailto:` message and hands it
 * to the visitor's mail client. Nothing is faked as "sent". When a secure send
 * endpoint exists later, implement `ContactTransport` and swap the export.
 */

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ContactTransport {
  /** Resolves once the message has been handed off. */
  send(message: ContactMessage): Promise<void>;
}

const mailtoTransport: ContactTransport = {
  async send(message) {
    const subject = `Nachricht über die Website – ${message.name}`;
    const body = [
      message.message,
      "",
      "—",
      `Name: ${message.name}`,
      `E-Mail: ${message.email}`,
    ].join("\n");

    const href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    if (typeof window !== "undefined") {
      window.location.href = href;
    }
  },
};

export const contactTransport: ContactTransport = mailtoTransport;
