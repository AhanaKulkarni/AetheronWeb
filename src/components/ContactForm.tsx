"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { INQUIRY_TOPICS, type InquiryTopic } from "@/config/company";
import { AETHERON_EASE } from "./MotionPrimitives";

interface FormState {
  fullName: string;
  workEmail: string;
  company: string;
  topic: InquiryTopic;
  message: string;
  website: string; // honeypot
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function resolveInitialTopic(param: string | null): InquiryTopic {
  if (
    param &&
    (INQUIRY_TOPICS as readonly string[]).includes(param)
  ) {
    return param as InquiryTopic;
  }
  return "General Inquiry";
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialTopic = resolveInitialTopic(searchParams.get("topic"));

  const [form, setForm] = useState<FormState>({
    fullName: "",
    workEmail: "",
    company: "",
    topic: initialTopic,
    message: "",
    website: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const validateClient = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (form.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name.";
    }
    if (!EMAIL_PATTERN.test(form.workEmail.trim())) {
      errors.workEmail = "Please enter a valid work email address.";
    }
    if (form.message.trim().length < 10) {
      errors.message =
        "Please include at least 10 characters describing your inquiry.";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedbackMessage("");

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus("error");
      setFeedbackMessage("Please review the highlighted fields before sending.");
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
        fieldErrors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setStatus("error");
        setFeedbackMessage(
          data.error ||
            "Unable to submit your inquiry right now. Please try again."
        );
        return;
      }

      setStatus("success");
      setFeedbackMessage(
        data.message || "Thank you. Your inquiry has been sent."
      );
      setForm({
        fullName: "",
        workEmail: "",
        company: "",
        topic: "General Inquiry",
        message: "",
        website: "",
      });
    } catch {
      setStatus("error");
      setFeedbackMessage(
        "A network error prevented submission. Please verify your connection and try again."
      );
    }
  };

  const inputBaseClass =
    "mt-2 w-full rounded-xl border bg-[#FAFBFD] px-4 py-3.5 text-[15px] text-[#101C32] placeholder:text-[#536176]/55 transition-all duration-300 focus:bg-[#FFFFFF] focus:outline-none";

  return (
    <div className="rounded-[26px] border border-[#E5EAF1] bg-[#FFFFFF] p-7 sm:p-10 shadow-[0_24px_60px_-30px_rgba(20,42,73,0.1)]">
      <div className="border-b border-[#E5EAF1] pb-6">
        <h3 className="font-display text-[22px] sm:text-[25px] font-medium tracking-[-0.02em] text-[#101C32]">
          Let&apos;s start a conversation.
        </h3>
        <p className="mt-1.5 text-[14px] text-[#536176]">
          Share a few details and our team will respond directly.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="inquiry-success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: AETHERON_EASE }}
            className="py-10 text-left"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#DCE6F5] bg-[#EFF4FB] text-[#315EAB]">
              <CheckCircle2 className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h4 className="font-display mt-5 text-[22px] font-medium tracking-[-0.02em] text-[#101C32]">
              Inquiry received.
            </h4>
            <p className="mt-2.5 max-w-md text-[15px] leading-[1.7] text-[#536176]">
              {feedbackMessage}
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setFeedbackMessage("");
              }}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#E5EAF1] bg-[#FAFBFD] px-5 py-2.5 text-[13.5px] font-medium text-[#142A49] transition-colors hover:border-[#315EAB]/40 hover:bg-[#EFF4FB]"
            >
              Send another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="inquiry-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="mt-7 space-y-5"
          >
            {/* Honeypot anti-spam trap */}
            <div aria-hidden="true" className="hidden">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, website: e.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-[13px] font-medium text-[#142A49]"
                >
                  Full Name <span className="text-[#315EAB]">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, fullName: e.target.value }));
                    if (fieldErrors.fullName) {
                      setFieldErrors((prev) => ({ ...prev, fullName: "" }));
                    }
                  }}
                  aria-invalid={Boolean(fieldErrors.fullName)}
                  className={`${inputBaseClass} ${
                    fieldErrors.fullName
                      ? "border-[#B42318]/60 focus:border-[#B42318]"
                      : "border-[#E5EAF1] focus:border-[#315EAB]"
                  }`}
                />
                {fieldErrors.fullName && (
                  <p className="mt-1.5 text-[12.5px] text-[#B42318]">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="workEmail"
                  className="block text-[13px] font-medium text-[#142A49]"
                >
                  Work Email <span className="text-[#315EAB]">*</span>
                </label>
                <input
                  id="workEmail"
                  name="workEmail"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={form.workEmail}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, workEmail: e.target.value }));
                    if (fieldErrors.workEmail) {
                      setFieldErrors((prev) => ({ ...prev, workEmail: "" }));
                    }
                  }}
                  aria-invalid={Boolean(fieldErrors.workEmail)}
                  className={`${inputBaseClass} ${
                    fieldErrors.workEmail
                      ? "border-[#B42318]/60 focus:border-[#B42318]"
                      : "border-[#E5EAF1] focus:border-[#315EAB]"
                  }`}
                />
                {fieldErrors.workEmail && (
                  <p className="mt-1.5 text-[12.5px] text-[#B42318]">
                    {fieldErrors.workEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="company"
                  className="block text-[13px] font-medium text-[#142A49]"
                >
                  Company / Organisation
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Organisation name"
                  value={form.company}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, company: e.target.value }))
                  }
                  className={`${inputBaseClass} border-[#E5EAF1] focus:border-[#315EAB]`}
                />
              </div>

              <div>
                <label
                  htmlFor="topic"
                  className="block text-[13px] font-medium text-[#142A49]"
                >
                  What would you like to discuss?{" "}
                  <span className="text-[#315EAB]">*</span>
                </label>
                <select
                  id="topic"
                  name="topic"
                  required
                  value={form.topic}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      topic: e.target.value as InquiryTopic,
                    }))
                  }
                  className={`${inputBaseClass} border-[#E5EAF1] focus:border-[#315EAB]`}
                >
                  {INQUIRY_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[13px] font-medium text-[#142A49]"
              >
                Message <span className="text-[#315EAB]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell us about your project, partnership interest, or question..."
                value={form.message}
                onChange={(e) => {
                  setForm((prev) => ({ ...prev, message: e.target.value }));
                  if (fieldErrors.message) {
                    setFieldErrors((prev) => ({ ...prev, message: "" }));
                  }
                }}
                aria-invalid={Boolean(fieldErrors.message)}
                className={`${inputBaseClass} resize-y min-h-[120px] ${
                  fieldErrors.message
                    ? "border-[#B42318]/60 focus:border-[#B42318]"
                    : "border-[#E5EAF1] focus:border-[#315EAB]"
                }`}
              />
              {fieldErrors.message && (
                <p className="mt-1.5 text-[12.5px] text-[#B42318]">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            {status === "error" && feedbackMessage && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-xl border border-[#F2B8B5] bg-[#FFF8F7] px-4 py-3.5 text-[13.5px] leading-[1.55] text-[#8C1D18]"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{feedbackMessage}</span>
              </motion.div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#142A49] to-[#315EAB] px-7 py-4 text-[14.5px] font-medium text-white shadow-[0_10px_28px_-10px_rgba(49,94,171,0.5)] transition-all duration-300 hover:shadow-[0_14px_34px_-10px_rgba(49,94,171,0.68)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Send Inquiry</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
