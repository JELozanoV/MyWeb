import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      {
        title: 'Portfolio Website',
        description: 'A full-stack portfolio website built with Next.js and Express featuring bilingual support and modern UI.',
        tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Prisma'],
        urlRepo: 'https://github.com/user/portfolio',
        urlDemo: 'https://portfolio-demo.com',
        images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop'
        ]
      },
      {
        title: 'E-commerce App',
        description: 'An e-commerce application with user authentication, payment integration, and admin dashboard.',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Stripe'],
        urlRepo: 'https://github.com/user/ecommerce',
        urlDemo: 'https://ecommerce-demo.com',
        images: [
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop'
        ]
      },
      {
        title: 'Task Manager API',
        description: 'RESTful API for task management with JWT authentication and real-time notifications.',
        tags: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io'],
        urlRepo: 'https://github.com/user/task-api',
        images: [
          'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop'
        ]
      }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });