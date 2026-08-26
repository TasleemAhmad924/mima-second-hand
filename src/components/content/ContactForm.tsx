"use client";

import { useState } from "react";
import { contactTransport } from "@/lib/contact";
import { siteConfig } from "@/config/site";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: {
  name: string;
  email: string;
  message: string;
}): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) {
    errors.name = "Bitte gib deinen Namen an.";
  }
  if (!values.email.trim()) {
    errors.email = "Bitte gib deine E-Mail-Adresse an.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Diese E-Mail-Adresse sieht nicht gültig aus.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Bitte schreib uns ein paar Worte mehr (mind. 10 Zeichen).";
  }
  return errors;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");

  const values = { name, email, message };

  function revalidate(nextTouched: Record<string, boolean>) {
    const nextErrors = validate(values);
    const shown: Errors = {};
    (Object.keys(nextErrors) as (keyof Errors)[]).forEach((key) => {
      if (nextTouched[key]) shown[key] = nextErrors[key];
    });
    setErrors(shown);
  }

  function handleBlur(field: keyof Errors) {
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);
    revalidate(nextTouched);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      const first = (["name", "email", "message"] as const).find(
        (key) => nextErrors[key],
      );
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await contactTransport.send({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-cream/40 p-8" role="status">
        <h2 className="font-display text-2xl text-charcoal">Fast geschafft.</h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
          Dein E-Mail-Programm öffnet sich mit deiner Nachricht. Falls das nicht
          klappt, schreib uns gern direkt an{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="link-underline text-charcoal"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setName("");
            setEmail("");
            setMessage("");
            setErrors({});
            setTouched({});
          }}
          className="mt-6 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-charcoal underline underline-offset-4"
        >
          Neue Nachricht schreiben
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <Field
        label="Name"
        name="name"
        value={name}
        onChange={setName}
        onBlur={() => handleBlur("name")}
        error={errors.name}
        autoComplete="name"
        required
      />
      <Field
        label="E-Mail"
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        onBlur={() => handleBlur("email")}
        error={errors.email}
        autoComplete="email"
        required
      />
      <Field
        label="Nachricht"
        name="message"
        value={message}
        onChange={setMessage}
        onBlur={() => handleBlur("message")}
        error={errors.message}
        multiline
        required
      />

      {status === "error" ? (
        <p className="text-sm text-[#9a3b2e]" role="alert">
          Da ist etwas schiefgelaufen. Bitte versuch es erneut oder schreib uns
          direkt an {siteConfig.contact.email}.
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Wird gesendet…" : "Nachricht senden"}
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-muted">
        Deine Angaben werden ausschließlich zur Beantwortung deiner Anfrage
        genutzt.
      </p>
    </form>
  );
}
