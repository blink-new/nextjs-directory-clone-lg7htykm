import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, TrendingUp, Users, ArrowRight, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const featuredResources = [
  {
    id: 1,
    title: "Next.js Commerce",
    description: "An all-in-one starter kit for high-performance e-commerce sites.",
    category: "E-commerce",
    url: "https://nextjs.org/commerce",
    stars: 4200,
    featured: true,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Vercel Analytics",
    description: "Real-time analytics for your Next.js applications.",
    category: "Analytics",
    url: "https://vercel.com/analytics",
    stars: 3800,
    featured: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "NextAuth.js",
    description: "Complete open source authentication solution for Next.js applications.",
    category: "Authentication",
    url: "https://next-auth.js.org",
    stars: 15600,
    featured: true,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Prisma",
    description: "Next-generation Node.js and TypeScript ORM for PostgreSQL, MySQL, MariaDB, SQL Server, SQLite, MongoDB and CockroachDB.",
    category: "Database",
    url: "https://prisma.io",
    stars: 32400,
    featured: true,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Tailwind CSS",
    description: "A utility-first CSS framework for rapidly building custom user interfaces.",
    category: "Styling",
    url: "https://tailwindcss.com",
    stars: 68200,
    featured: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
  },
  {
    id: 6,
    title: "Framer Motion",
    description: "A production-ready motion library for React.",
    category: "Animation",
    url: "https://framer.com/motion",
    stars: 21800,
    featured: true,
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop"
  }
]

const categories = [
  { name: "UI Components", count: 245, icon: "🎨" },
  { name: "Authentication", count: 89, icon: "🔐" },
  { name: "Database", count: 156, icon: "🗄️" },
  { name: "E-commerce", count: 78, icon: "🛒" },
  { name: "Analytics", count: 67, icon: "📊" },
  { name: "Deployment", count: 123, icon: "🚀" },
  { name: "Testing", count: 94, icon: "🧪" },
  { name: "Animation", count: 112, icon: "✨" }
]

const stats = [
  { label: "Resources", value: "1,200+" },
  { label: "Categories", value: "25+" },
  { label: "Contributors", value: "500+" },
  { label: "Monthly Visits", value: "50K+" }
]

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Discover the Best{' '}
              <span className="text-primary">Next.js</span>{' '}
              Resources
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A curated directory of tools, libraries, templates, and resources to supercharge your Next.js development.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for components, tools, templates..."
                  className="pl-12 pr-4 h-14 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="absolute right-2 top-2 h-10">
                  Search
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/browse">
                  Browse Directory
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/submit">
                  Submit Resource
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you need with our organized categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/directories`}
                className="group"
              >
                <Card className="h-full hover:shadow-md transition-all duration-200 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.count} resources
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
              <p className="text-muted-foreground">
                Hand-picked tools and libraries that are trending in the Next.js community
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/browse?featured=true">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="group hover:shadow-lg transition-all duration-200">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{resource.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1" />
                      {resource.stars.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4">
                    {resource.description}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <Button asChild variant="outline" size="sm">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Visit
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Resource?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Help the Next.js community discover amazing tools and libraries by submitting your resource.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/submit">
              Submit Your Resource
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}