"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { services, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 422) {
        const json = await res.json();
        setErrors(json.errors ?? {});
        setStatus("error");
        setMessage("Please check the highlighted fields.");
        return;
      }
      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(`Something went wrong. Please call us on ${site.phone}.`);
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-8">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-amber-soft text-amber-deep">
          <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h3 className="text-h3 font-display font-medium text-ink">
          Thanks — we&apos;ve got it.
        </h3>
        <p className="measure-sm text-ink-soft">
          A member of our team will be in touch within one business day to
          arrange your consultation. For anything urgent, call{" "}
          <a href={site.phoneHref} className="link-underline font-medium text-ink">
            {site.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-2 text-sm font-medium text-ink"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const fieldError = (key: keyof Errors) =>
    errors[key] ? (
      <p className="mt-1.5 text-sm text-destructive" role="alert">
        {errors[key]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4" aria-label="Contact form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-2 text-ink">
            Name <span className="text-amber-deep">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            className="h-12 border-line-strong bg-bg"
          />
          {fieldError("name")}
        </div>
        <div>
          <Label htmlFor="company" className="mb-2 text-ink">
            Company
          </Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            className="h-12 border-line-strong bg-bg"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email" className="mb-2 text-ink">
            Email <span className="text-amber-deep">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            className="h-12 border-line-strong bg-bg"
          />
          {fieldError("email")}
        </div>
        <div>
          <Label htmlFor="phone" className="mb-2 text-ink">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-12 border-line-strong bg-bg"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="service" className="mb-2 text-ink">
          What can we help with?
        </Label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className="h-12 w-full rounded-md border border-line-strong bg-bg px-3 text-sm text-ink outline-none transition-colors focus-visible:border-amber focus-visible:ring-2 focus-visible:ring-amber/40"
        >
          <option value="" disabled>
            Select a service…
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="mb-2 text-ink">
          How can we help? <span className="text-amber-deep">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={!!errors.message}
          placeholder="Tell us about your operation, sites, and what you're trying to achieve."
          className="resize-y border-line-strong bg-bg"
        />
        {fieldError("message")}
      </div>

      {status === "error" && message && (
        <p className="text-sm text-destructive" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-md bg-graphite px-6 py-4 font-medium text-onDark transition-colors duration-300 hover:bg-graphite-deep disabled:opacity-70",
        )}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
