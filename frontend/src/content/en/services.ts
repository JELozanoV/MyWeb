import type { ServicesContent } from '../types'

// Proposed copy: adjust it to what you actually offer your clients.
export const services: ServicesContent = {
  eyebrow: 'Services',
  title: 'How can I help you?',
  description: 'I work with companies and founders who need a well-built web product, from idea to production.',
  cta: 'Get a quote',
  items: [
    {
      icon: 'web',
      title: 'Custom web development',
      description: 'Fast, responsive and maintainable websites and web apps with React and Next.js.',
      features: [
        'Landing pages and corporate sites',
        'Web apps and management dashboards',
        'Layouts that adapt to mobile and desktop'
      ]
    },
    {
      icon: 'api',
      title: 'Backend & APIs',
      description: 'Your business logic with Node.js and Express, on top of SQL or NoSQL databases.',
      features: [
        'REST APIs for web and mobile',
        'Data modeling in PostgreSQL and MongoDB',
        'Third-party service integrations'
      ]
    },
    {
      icon: 'ai',
      title: 'AI integrations',
      description: 'I bring OpenAI, Gemini or Claude models into your product or internal processes.',
      features: [
        'Chatbots with your business context',
        'Assistants and recommendations for your team',
        'Automation of repetitive tasks'
      ]
    },
    {
      icon: 'speed',
      title: 'Optimization & maintenance',
      description: 'I improve the performance and quality of projects that are already running.',
      features: [
        'Load speed and Core Web Vitals',
        'Dependency upgrades and migrations',
        'Bug fixes and new features'
      ]
    }
  ]
}
