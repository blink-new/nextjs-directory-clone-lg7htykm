import { useState, useMemo, useEffect } from 'react'
import { Search, Filter, Star, ExternalLink, Grid, List, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { getApprovedResources, Resource } from '@/lib/database'



const categories = [
  "All",
  "UI Components",
  "Authentication",
  "Database",
  "E-commerce",
  "Analytics",
  "Styling",
  "Animation",
  "Backend",
  "Testing",
  "Deployment"
]

export function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('stars')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Get resources (will fallback to static data if database fails)
        const approvedResources = await getApprovedResources()
        setResources(approvedResources)
      } catch (error) {
        console.error('Error loading resources:', error)
        // Even if everything fails, we should still stop loading
        setResources([])
      } finally {
        setLoading(false)
      }
    }

    loadResources()
  }, [])

  const filteredResources = useMemo(() => {
    let filtered = resources

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(resource => resource.category === selectedCategory)
    }

    // Filter by featured
    if (showFeaturedOnly) {
      filtered = filtered.filter(resource => resource.featured)
    }

    // Sort resources
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stars - a.stars
        case 'name':
          return a.title.localeCompare(b.title)
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [resources, searchQuery, selectedCategory, sortBy, showFeaturedOnly])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Browse Resources</h1>
          <p className="text-muted-foreground text-lg">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading resources...
              </span>
            ) : (
              `Discover ${resources.length}+ curated Next.js resources`
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search resources..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {category}
                          {category === 'All' && (
                            <span className="text-muted-foreground ml-1">
                              ({resources.length})
                            </span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Featured Only */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={showFeaturedOnly}
                    onCheckedChange={setShowFeaturedOnly}
                  />
                  <label htmlFor="featured" className="text-sm cursor-pointer">
                    Featured only
                  </label>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stars">Most Stars</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {filteredResources.length} resources found
              </p>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Loading resources...</p>
                </div>
              </div>
            ) : (
              <>
                {/* Resources Grid/List */}
                {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="group hover:shadow-lg transition-all duration-200">
                    <div className="aspect-video overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/10 to-primary/5">
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">
                            {resource.category === 'UI Components' && '🎨'}
                            {resource.category === 'Authentication' && '🔐'}
                            {resource.category === 'Database' && '🗄️'}
                            {resource.category === 'E-commerce' && '🛒'}
                            {resource.category === 'Analytics' && '📊'}
                            {resource.category === 'Styling' && '✨'}
                            {resource.category === 'Animation' && '🎭'}
                            {resource.category === 'Backend' && '⚡'}
                            {resource.category === 'Testing' && '🧪'}
                            {resource.category === 'Deployment' && '🚀'}
                            {!['UI Components', 'Authentication', 'Database', 'E-commerce', 'Analytics', 'Styling', 'Animation', 'Backend', 'Testing', 'Deployment'].includes(resource.category) && '📦'}
                          </div>
                          <div className="text-xs text-muted-foreground font-medium">
                            {resource.category}
                          </div>
                        </div>
                      </div>
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
                        {resource.featured && (
                          <Badge variant="default" className="ml-2 text-xs">
                            Featured
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="mb-4 line-clamp-2">
                        {resource.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <Button asChild variant="outline" size="sm">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            Visit
                            <ExternalLink className="ml-2 h-3 w-3" />
                          </a>
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          by {resource.author}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="group hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/10 to-primary/5">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl">
                                {resource.category === 'UI Components' && '🎨'}
                                {resource.category === 'Authentication' && '🔐'}
                                {resource.category === 'Database' && '🗄️'}
                                {resource.category === 'E-commerce' && '🛒'}
                                {resource.category === 'Analytics' && '📊'}
                                {resource.category === 'Styling' && '✨'}
                                {resource.category === 'Animation' && '🎭'}
                                {resource.category === 'Backend' && '⚡'}
                                {resource.category === 'Testing' && '🧪'}
                                {resource.category === 'Deployment' && '🚀'}
                                {!['UI Components', 'Authentication', 'Database', 'E-commerce', 'Analytics', 'Styling', 'Animation', 'Backend', 'Testing', 'Deployment'].includes(resource.category) && '📦'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                {resource.title}
                                {resource.featured && (
                                  <Badge variant="default" className="ml-2 text-xs">
                                    Featured
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                by {resource.author}
                              </p>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Star className="h-4 w-4 mr-1" />
                              {resource.stars.toLocaleString()}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {resource.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{resource.category}</Badge>
                              {resource.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button asChild variant="outline" size="sm">
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                Visit
                                <ExternalLink className="ml-2 h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

                {filteredResources.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg mb-4">
                      No resources found matching your criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategory('All')
                        setShowFeaturedOnly(false)
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}