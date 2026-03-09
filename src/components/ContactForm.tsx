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

    const newErrors: FormErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      company: validateCompany(formData.company),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, company: true, message: true });

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", message: "" });
      setTouched({});
      setErrors({});
      setIsSuccess(false);
    }, 3000);
  };

  const getFieldStyle = (field: keyof FormData): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      width: '100%',
      borderRadius: '0.75rem',
      padding: '1rem 1.5rem',
      outline: 'none',
      transition: 'all 0.2s',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
    };
    
    if (touched[field] && errors[field]) {
      return { ...baseStyle, borderColor: '#ef4444' };
    }
    if (touched[field] && !errors[field]) {
      return { ...baseStyle, borderColor: 'var(--accent-green)' };
    }
    return { ...baseStyle, borderColor: 'var(--border-color)' };
  };

  return (
    <section id="waitlist" className="container mx-auto px-6 py-32 text-center">
      <div className="max-w-3xl mx-auto p-8 md:p-12 rounded-[2rem] border backdrop-blur-xl" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--accent-blue)', borderWidth: '1px' }}>
        {isSuccess ? (
          <div className="py-12">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--accent-green-bg)' }}>
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--accent-green)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready for Sub-Dollar Pricing?</h2>
            <p className="mb-10" style={{ color: 'var(--text-secondary)' }}>We are onboarding a limited number of B2B partners for Q2 2026.</p>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="John Doe"
                  style={{ ...getFieldStyle("name"), color: 'var(--text-primary)' }}
                  disabled={isSubmitting}
                />
                {touched.name && errors.name && (
                  <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Email <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="john@company.com"
                  style={{ ...getFieldStyle("email"), color: 'var(--text-primary)' }}
                  disabled={isSubmitting}
                />
                {touched.email && errors.email && (
                  <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Company <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  onBlur={() => handleBlur("company")}
                  placeholder="Acme Inc."
                  style={{ ...getFieldStyle("company"), color: 'var(--text-primary)' }}
                  disabled={isSubmitting}
                />
                {touched.company && errors.company && (
                  <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{errors.company}</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="message" className="block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    Message
                  </label>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{formData.message.length}/500</span>
                </div>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  placeholder="Tell us about your use case..."
                  rows={4}
                  maxLength={500}
                  style={{ ...getFieldStyle("message"), color: 'var(--text-primary)' }}
                  disabled={isSubmitting}
                />
                {touched.message && errors.message && (
                  <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-10 py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
