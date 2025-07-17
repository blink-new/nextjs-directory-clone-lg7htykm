import { blink } from '@/blink/client'

export interface Resource {
  id: string
  title: string
  description: string
  url: string
  category: string
  tags: string // JSON string
  author: string
  authorUrl?: string
  githubUrl?: string
  documentation?: string
  license?: string
  featured: boolean
  userId: string
  status: 'pending' | 'approved' | 'rejected'
  stars: number
  createdAt: string
  updatedAt: string
}

// Database initialization is handled automatically by Blink SDK
// Sample data is provided through static fallback in getApprovedResources

// Static fallback data when database is unavailable
const staticResources: Resource[] = [
  {
    id: 'sample-1',
    title: 'Next.js Commerce',
    description: 'An all-in-one starter kit for high-performance e-commerce sites built with Next.js, Vercel, and Shopify.',
    url: 'https://nextjs.org/commerce',
    category: 'E-commerce',
    tags: ['e-commerce', 'shopify', 'vercel', 'starter'],
    author: 'Vercel',
    authorUrl: 'https://vercel.com',
    githubUrl: 'https://github.com/vercel/commerce',
    documentation: 'https://nextjs.org/commerce',
    license: 'MIT',
    featured: true,
    userId: 'system',
    status: 'approved',
    stars: 4200,
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 'sample-2',
    title: 'NextAuth.js',
    description: 'Complete open source authentication solution for Next.js applications with multiple providers.',
    url: 'https://next-auth.js.org',
    category: 'Authentication',
    tags: ['auth', 'oauth', 'jwt', 'security'],
    author: 'NextAuth.js Team',
    authorUrl: 'https://next-auth.js.org',
    githubUrl: 'https://github.com/nextauthjs/next-auth',
    documentation: 'https://next-auth.js.org/getting-started/introduction',
    license: 'ISC',
    featured: true,
    userId: 'system',
    status: 'approved',
    stars: 15600,
    createdAt: new Date('2024-01-05').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString()
  },
  {
    id: 'sample-3',
    title: 'Prisma',
    description: 'Next-generation Node.js and TypeScript ORM for PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, MongoDB and CockroachDB.',
    url: 'https://prisma.io',
    category: 'Database',
    tags: ['orm', 'database', 'typescript', 'postgresql'],
    author: 'Prisma',
    authorUrl: 'https://prisma.io',
    githubUrl: 'https://github.com/prisma/prisma',
    documentation: 'https://www.prisma.io/docs',
    license: 'Apache-2.0',
    featured: true,
    userId: 'system',
    status: 'approved',
    stars: 32400,
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString()
  },
  {
    id: 'sample-4',
    title: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapidly building custom user interfaces.',
    url: 'https://tailwindcss.com',
    category: 'Styling',
    tags: ['css', 'utility', 'responsive', 'design'],
    author: 'Tailwind Labs',
    authorUrl: 'https://tailwindlabs.com',
    githubUrl: 'https://github.com/tailwindlabs/tailwindcss',
    documentation: 'https://tailwindcss.com/docs',
    license: 'MIT',
    featured: true,
    userId: 'system',
    status: 'approved',
    stars: 68200,
    createdAt: new Date('2024-01-12').toISOString(),
    updatedAt: new Date('2024-01-12').toISOString()
  },
  {
    id: 'sample-5',
    title: 'Framer Motion',
    description: 'A production-ready motion library for React with declarative animations.',
    url: 'https://framer.com/motion',
    category: 'Animation',
    tags: ['animation', 'motion', 'react', 'gestures'],
    author: 'Framer',
    authorUrl: 'https://framer.com',
    githubUrl: 'https://github.com/framer/motion',
    documentation: 'https://www.framer.com/motion/',
    license: 'MIT',
    featured: true,
    userId: 'system',
    status: 'approved',
    stars: 21800,
    createdAt: new Date('2024-01-08').toISOString(),
    updatedAt: new Date('2024-01-08').toISOString()
  },
  {
    id: 'sample-6',
    title: 'Shadcn/ui',
    description: 'Beautifully designed components built with Radix UI and Tailwind CSS.',
    url: 'https://ui.shadcn.com',
    category: 'UI Components',
    tags: ['components', 'radix', 'tailwind', 'accessible'],
    author: 'shadcn',
    authorUrl: 'https://ui.shadcn.com',
    githubUrl: 'https://github.com/shadcn-ui/ui',
    documentation: 'https://ui.shadcn.com/docs',
    license: 'MIT',
    featured: false,
    userId: 'system',
    status: 'approved',
    stars: 45600,
    createdAt: new Date('2024-01-18').toISOString(),
    updatedAt: new Date('2024-01-18').toISOString()
  },
  {
    id: 'sample-7',
    title: 'React Hook Form',
    description: 'Performant, flexible and extensible forms with easy validation.',
    url: 'https://react-hook-form.com',
    category: 'UI Components',
    tags: ['forms', 'validation', 'performance', 'hooks'],
    author: 'React Hook Form',
    authorUrl: 'https://react-hook-form.com',
    githubUrl: 'https://github.com/react-hook-form/react-hook-form',
    documentation: 'https://react-hook-form.com/get-started',
    license: 'MIT',
    featured: false,
    userId: 'system',
    status: 'approved',
    stars: 38900,
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-10').toISOString()
  },
  {
    id: 'sample-8',
    title: 'Zustand',
    description: 'A small, fast and scalable bearbones state-management solution using simplified flux principles.',
    url: 'https://zustand-demo.pmnd.rs',
    category: 'Backend',
    tags: ['state', 'management', 'flux', 'lightweight'],
    author: 'Poimandres',
    authorUrl: 'https://pmnd.rs',
    githubUrl: 'https://github.com/pmndrs/zustand',
    documentation: 'https://zustand-demo.pmnd.rs',
    license: 'MIT',
    featured: false,
    userId: 'system',
    status: 'approved',
    stars: 41200,
    createdAt: new Date('2024-01-22').toISOString(),
    updatedAt: new Date('2024-01-22').toISOString()
  }
]

export const getApprovedResources = async (): Promise<Resource[]> => {
  try {
    const resources = await blink.db.resources.list({
      where: { status: 'approved' },
      orderBy: { createdAt: 'desc' }
    })
    
    return resources.map(resource => ({
      ...resource,
      tags: JSON.parse(resource.tags || '[]'),
      featured: Number(resource.featured) > 0
    }))
  } catch (error) {
    console.error('Database unavailable, using static data:', error)
    // Return static data when database is unavailable
    return staticResources
  }
}