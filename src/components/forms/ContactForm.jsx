"use client";

import { useState } from "react";
import { FormField } from "./FormField";
import { Button } from "@/components/ui/Button";

import { trackContactConversion } from "@/lib/analytics";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      trackContactConversion({ name: values.name, phone: values.phone, email: values.email });
      setValues({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="animate-fade-up glass-light rounded-[var(--radius-lg)] p-8 text-center shadow-[var(--shadow-soft)]">
        <h3 className="text-h3 font-display text-[var(--color-ink)]">Message sent</h3>
        <p className="mt-2.5 text-[17px] text-[var(--color-text-muted)]">
          Thanks for reaching out — we&rsquo;ll get back to you shortly. For a faster response, call or WhatsApp us.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-light rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Name" name="name" required value={values.name} onChange={set("name")} />
        <FormField label="Phone" name="phone" type="tel" required value={values.phone} onChange={set("phone")} />
      </div>
      <FormField label="Email" name="email" type="email" className="mt-4" value={values.email} onChange={set("email")} />
      <FormField label="Message" name="message" as="textarea" className="mt-4" value={values.message} onChange={set("message")} />
      <Button type="submit" variant="accent" size="lg" className="mt-5 w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
      {status === "error" && (
        <p className="animate-fade-in mt-3 text-sm text-[var(--color-danger)]">Something went wrong — please call or WhatsApp us instead.</p>
      )}
    </form>
  );
}
