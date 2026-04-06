'use client';

import { useState } from 'react';
import { useContent } from '../src/hooks/useContent';
import { z } from 'zod';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

type EmailJSError = {
  status?: number;
  text?: string;
  message?: string;
};

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
});

type ContactFormData = z.infer<typeof contactSchema>;

const getEmailJSErrorMessage = (error: EmailJSError, locale: 'es' | 'en') => {
  const details = [error.text, error.message].filter(Boolean).join(' - ').toLowerCase();

  if (details.includes('public key')) {
    return locale === 'es'
      ? 'La clave pública de EmailJS es inválida o no coincide con tu proyecto.'
      : 'The EmailJS public key is invalid or does not match your project.';
  }

  if (details.includes('service')) {
    return locale === 'es'
      ? 'El service ID de EmailJS es inválido o no está disponible.'
      : 'The EmailJS service ID is invalid or unavailable.';
  }

  if (details.includes('template')) {
    return locale === 'es'
      ? 'El template ID de EmailJS es inválido o no está publicado.'
      : 'The EmailJS template ID is invalid or not published.';
  }

  if (details.includes('network') || details.includes('failed to fetch')) {
    return locale === 'es'
      ? 'No se pudo conectar con EmailJS. Verifica tu red e inténtalo nuevamente.'
      : 'Could not connect to EmailJS. Check your network and try again.';
  }

  if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 404) {
    return locale === 'es'
      ? 'EmailJS rechazó la solicitud. Revisa las credenciales y la configuración del servicio y la plantilla.'
      : 'EmailJS rejected the request. Check the credentials and the service/template configuration.';
  }

  return locale === 'es'
    ? 'No fue posible enviar el mensaje. Revisa la configuración de EmailJS e inténtalo nuevamente.'
    : 'The message could not be sent. Check the EmailJS configuration and try again.';
};

export default function ContactForm() {
  const { labels } = useContent();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locale = labels.form.submit === 'Enviar' ? 'es' : 'en';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      contactSchema.parse(formData);
      setErrors({});
      setError(null);
      setIsSubmitting(true);
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

      console.group('EmailJS Pre-flight Check');
      console.log('1. Variables de entorno (Next.js client-side):', {
        SERVICE_ID: serviceId || 'UNDEFINED/MISSING',
        TEMPLATE_ID: templateId || 'UNDEFINED/MISSING',
        PUBLIC_KEY: publicKey ? `${publicKey.substring(0, 4)}...` : 'UNDEFINED/MISSING'
      });
      console.log('2. Payload del Formulario:', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: formData.subject // Solo informativo, no va a EmailJS
      });
      console.groupEnd();

      if (!serviceId || !templateId || !publicKey) {
        setError(
          locale === 'es'
            ? 'Falta la configuración de EmailJS en el entorno. Verifica NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID y NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.'
            : 'EmailJS environment configuration is missing. Check NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.'
        );
        setIsSubmitting(false);
        return;
      }

      if (!formRef.current) {
        setError(
          locale === 'es'
            ? 'No se pudo acceder al formulario para enviarlo. Recarga la página e inténtalo nuevamente.'
            : 'The form could not be accessed for submission. Reload the page and try again.'
        );
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        { publicKey }
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ContactFormData> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error('EmailJS error object:', error);
        if (error && typeof error === 'object' && 'text' in error) {
          console.error('EmailJS error exact text (HTTP 400 info):', (error as EmailJSError).text);
        }
        setError(getEmailJSErrorMessage(error as EmailJSError, locale));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      ref={formRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto"
    >
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium dark:text-white text-primary-900 mb-2">
          {labels.form.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-primary-900/20 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-accent text-primary-900 dark:text-white placeholder-primary-900/40 dark:placeholder-white/50"
          placeholder="Tu nombre"
          required
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium dark:text-white text-primary-900 mb-2">
          {labels.form.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-primary-900/20 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-accent text-primary-900 dark:text-white placeholder-primary-900/40 dark:placeholder-white/50"
          placeholder="tu@email.com"
          required
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium dark:text-white text-primary-900 mb-2">
          {labels.form.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-primary-900/20 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-accent text-primary-900 dark:text-white placeholder-primary-900/40 dark:placeholder-white/50"
          placeholder="Asunto del mensaje"
          required
        />
        {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium dark:text-white text-primary-900 mb-2">
          {labels.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-primary-900/20 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-accent text-primary-900 dark:text-white placeholder-primary-900/40 dark:placeholder-white/50 resize-none"
          placeholder="Tu mensaje..."
          required
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-brown py-3 px-4 rounded-lg hover:bg-accent/80 disabled:opacity-50 transition-colors font-medium flex items-center justify-center"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-2 border-brown border-t-transparent rounded-full animate-spin mr-2"></div>
            {labels.form.submitting}
          </div>
        ) : (
          labels.form.submit
        )}
      </motion.button>
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-4 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-4 text-center"
        >
          <p className="text-green-400 text-base font-medium">{labels.form.success}</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-brown transition-colors hover:bg-accent/80"
          >
            {labels.form.sendAnother}
          </button>
        </motion.div>
      )}
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </motion.form>
  );
}