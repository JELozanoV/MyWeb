import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Mock data for now - replace with actual backend call when backend is running
    const projects = [
      {
        id: 1,
        title: 'Portfolio Website',
        description: 'A full-stack portfolio website built with Next.js and Express.',
        tags: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
        url: 'https://github.com/user/portfolio'
      },
      {
        id: 2,
        title: 'E-commerce App',
        description: 'An e-commerce application with user authentication and payment integration.',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'Prisma'],
        url: 'https://github.com/user/ecommerce'
      }
    ]
    res.status(200).json(projects)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}