import { useMemo, useState } from 'react';
import { useContent } from '../src/hooks/useContent';
import { z } from 'zod';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';

type EmailJSError = {
  status?: number;
  text?: string;
  message?: string;
};

type FormLabels = ReturnType<typeof useContent>['labels']['form'];

// El esquema se construye con los mensajes del idioma activo
const buildContactSchema = (messages: FormLabels['validation']) =>
  z.object({
    name: z.string().trim().min(2, messages.name),
    email: z.email(messages.email),
    subject: z.string().trim().min(5, messages.subject),
    message: z.string().trim().min(10, messages.message)
  });

type ContactFormData = z.infer<ReturnType<typeof buildContactSchema>>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const emptyForm: ContactFormData = { name: '', email: '', subject: '', message: '' };

// Mensaje para el visitante; el detalle técnico queda solo en la consola
const getSendErrorMessage = (error: EmailJSError, messages: FormLabels['errors']) => {
  const details = [error.text, error.message].filter(Boolean).join(' - ').toLowerCase();
  if (details.includes('network') || details.includes('failed to fetch')) {
    return messages.network;
  }
  return messages.generic;
};

const inputClass = 'input';

export default function ContactForm() {
  const { labels } = useContent();
  const form = labels.form;
  const contactSchema = useMemo(() => buildContactSchema(form.validation), [form.validation]);
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof ContactFormData | undefined;
        if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

    if (!serviceId || !templateId || !publicKey) {
      console.error(
        'EmailJS: faltan NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID o NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.'
      );
      setError(form.errors.missingConfig);
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: result.data.name,
          email: result.data.email,
          subject: result.data.subject,
          message: result.data.message,
        },
        { publicKey }
      );
      setSubmitted(true);
      setFormData(emptyForm);
    } catch (sendError) {
      console.error('EmailJS error:', sendError);
      setError(getSendErrorMessage(sendError as EmailJSError, form.errors));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-fg mb-2">
          {form.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
          placeholder={form.placeholders.name}
          aria-invalid={!!errors.name}
          required
        />
        {errors.name && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-fg mb-2">
          {form.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
          placeholder={form.placeholders.email}
          aria-invalid={!!errors.email}
          required
        />
        {errors.email && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-fg mb-2">
          {form.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={inputClass}
          placeholder={form.placeholders.subject}
          aria-invalid={!!errors.subject}
          required
        />
        {errors.subject && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.subject}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-fg mb-2">
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder={form.placeholders.message}
          aria-invalid={!!errors.message}
          required
        />
        {errors.message && <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full py-3.5 text-base"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            {form.submitting}
          </div>
        ) : (
          form.submit
        )}
      </motion.button>
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-4 text-center"
          role="status"
        >
          <p className="text-green-700 dark:text-green-400 text-base font-medium">{form.success}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="btn-secondary mt-3 !px-4 !py-2"
          >
            {form.sendAnother}
          </button>
        </motion.div>
      )}
      {error && <p className="text-red-600 dark:text-red-400 text-sm mt-2" role="alert">{error}</p>}
    </form>
  );
}
