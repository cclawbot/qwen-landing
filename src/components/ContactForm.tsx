"use client";

import { useState, useEffect, useRef } from "react";
import { trackFormViewed } from "@/lib/analytics";

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

interface TouchedFields {
  name?: boolean;
  email?: boolean;
  company?: boolean;
  message?: boolean;
}

// Validation functions
const validateName = (value: string): string | undefined => {
  if (!value.trim()) return "Name is required";
  if (value.trim().length < 2) return "Name must be at least 2 characters";
  if (value.length > 100) return "Name must be less than 100 characters";
  return undefined;
};

const validateEmail = (value: string): string | undefined => {
  if (!value.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Please enter a valid email address";
  return undefined;
};

const validateCompany = (value: string): string | undefined => {
  if (!value.trim()) return "Company is required";
  if (value.trim().length < 2) return "Company must be at least 2 characters";
  if (value.length > 100) return "Company must be less than 100 characters";
  return undefined;
};

const validateMessage = (value: string): string | undefined => {
  if (value.length > 500) return "Message must be less than 500 characters";
  return undefined;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const hasTrackedRef = useRef(false);

  // Track form view on mount
  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackFormViewed();
    }
  }, []);

  const validateField = (field: keyof FormData): string | undefined => {
    switch (field) {
      case "name":
        return validateName(formData.name);
      case "email":
        return validateEmail(formData.email);
      case "company":
        return validateCompany(formData.company);
      case "message":
        return validateMessage(formData.message);
      default:
        return undefined;
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      company: validateCompany(formData.company),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, company: true, message: true });

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Log form data (in production, this would be sent to backend)
    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", message: "" });
      setTouched({});
      setErrors({});
      setIsSuccess(false);
    }, 3000);
  };

  const getFieldClass = (field: keyof FormData): string => {
    const baseClass =
      "w-full bg-gray-900 border rounded-xl px-6 py-4 focus:outline-none transition-all text-white placeholder-gray-500";
    if (touched[field] && errors[field]) {
      return `${baseClass} border-red-500 focus:border-red-500`;
    }
    if (touched[field] && !errors[field]) {
      return `${baseClass} border-green-500 focus:border-green-500`;
    }
    return `${baseClass} border-gray-700 focus:border-blue-500`;
  };

  return (
    <section id="waitlist" className="container mx-auto px-6 py-32 text-center">
      <div className="max-w-3xl mx-auto bg-[rgba(17,24,39,0.7)] p-8 md:p-12 rounded-[2rem] border border-blue-500/30 backdrop-blur-xl">
        {isSuccess ? (
          <div className="py-12">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">
              Thank You!
            </h3>
            <p className="text-gray-400">
              We&apos;ve received your message and will get back to you soon.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Ready for Sub-Dollar Pricing?
            </h2>
            <p className="text-gray-400 mb-10">
              We are onboarding a limited number of B2B partners for Q2 2026.
              Secure your spot on the priority access list.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="John Doe"
                  className={getFieldClass("name")}
                  disabled={isSubmitting}
                />
                {touched.name && errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="john@company.com"
                  className={getFieldClass("email")}
                  disabled={isSubmitting}
                />
                {touched.email && errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Company Field */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Company <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  onBlur={() => handleBlur("company")}
                  placeholder="Acme Inc."
                  className={getFieldClass("company")}
                  disabled={isSubmitting}
                />
                {touched.company && errors.company && (
                  <p className="mt-2 text-sm text-red-400">{errors.company}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Message
                  </label>
                  <span className="text-xs text-gray-500">
                    {formData.message.length}/500
                  </span>
                </div>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  placeholder="Tell us about your use case..."
                  rows={4}
                  maxLength={500}
                  className={getFieldClass("message")}
                  disabled={isSubmitting}
                />
                {touched.message && errors.message && (
                  <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black px-10 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Join Waitlist"
                )}
              </button>
            </form>
            <p className="mt-6 text-xs text-gray-500">
              Join 400+ enterprises optimizing their LLM spend.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
