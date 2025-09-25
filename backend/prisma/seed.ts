import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      {
        title: 'Portfolio Website',
        description: 'A full-stack portfolio website built with Next.js and Express.',
        tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
        urlRepo: 'https://github.com/user/portfolio',
        urlDemo: 'https://portfolio-demo.com'
      },
      {
        title: 'E-commerce App',
        description: 'An e-commerce application with user authentication and payment integration.',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'Prisma'],
        urlRepo: 'https://github.com/user/ecommerce',
        urlDemo: 'https://ecommerce-demo.com'
      },
      {
        title: 'Task Manager API',
        description: 'RESTful API for task management with JWT authentication.',
        tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
        urlRepo: 'https://github.com/user/task-api'
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