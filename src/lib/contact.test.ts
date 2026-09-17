import { afterEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { web3forms } from "@/config/web3forms";
import { contactTransport } from "@/lib/contact";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("contact transport", () => {
  it("posts to Web3Forms with the public access key", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      status: 200,
      json: async () => ({ success: true, message: "Email sent successfully!" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await contactTransport.send({
      name: "Ada",
      email: "ada@example.com",
      message: "Hallo, ich möchte ein Regal mieten.",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [
      string,
      { method: string; body: FormData },
    ];
    expect(url).toBe("https://api.web3forms.com/submit");
    expect(init.method).toBe("POST");
    expect(init.body.get("access_key")).toBe(web3forms.accessKey);
    expect(init.body.get("name")).toBe("Ada");
    expect(init.body.get("email")).toBe("ada@example.com");
    expect(init.body.get("from_name")).toBe(siteConfig.name);
    expect(init.body.get("botcheck")).toBeNull();
  });

  it("does not send when the honeypot is filled", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await contactTransport.send({
      name: "Bot",
      email: "bot@example.com",
      message: "Spam ".repeat(8),
      botcheck: true,
    });

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("throws when Web3Forms reports failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 400,
        json: async () => ({ success: false, message: "Invalid" }),
      }),
    );

    await expect(
      contactTransport.send({
        name: "Ada",
        email: "ada@example.com",
        message: "Hallo, ich möchte ein Regal mieten.",
      }),
    ).rejects.toThrow("web3forms_failed");
  });
});
