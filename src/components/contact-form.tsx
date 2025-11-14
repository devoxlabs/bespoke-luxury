"use client";

import { FormEvent } from "react";

export default function ContactForm() {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    window.alert(
      `Thanks${name ? `, ${name}` : ""}! Your message was captured locally for this demo.`,
    );
    form.reset();
  };

  return (
    <div className="relative">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="field-group">
            <label htmlFor="name" className="contact-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="contact-field peer"
              placeholder=" "
              required
            />
            <span className="contact-hint">How should we address you?</span>
          </div>

          <div className="field-group">
            <label htmlFor="email" className="contact-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="contact-field peer"
              placeholder=" "
              required
            />
            <span className="contact-hint">Where can we reach you?</span>
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="message" className="contact-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="contact-field peer resize-none"
            placeholder=" "
            required
          />
          <span className="contact-hint">
            A few lines about your product, timeline, and goals.
          </span>
        </div>

        <button
          type="submit"
          className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full border border-white/25 bg-emerald-500/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-all duration-300 ease-out hover:scale-105 hover:border-emerald-200 hover:bg-emerald-200/80 hover:text-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.65)] md:w-auto"
        >
          <span className="relative z-10">Send message</span>
          <div className="pointer-events-none absolute inset-0 flex h-full w-full justify-center skew-translate">
            <div className="h-full w-12 bg-white/50 blur-lg" />
          </div>
        </button>
      </form>
    </div>
  );
}
