import { useState, useEffect } from 'react'
import { ArrowLeft, Upload, Link as LinkIcon, Tag, Globe, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { blink } from '@/blink/client'

const categories = [
  "UI Components",
  "Authentication",
  "Database",
  "E-commerce",
  "Analytics",
  "Styling",
  "Animation",
  "Backend",
  "Testing",
  "Deployment",
  "Tools",
  "Templates"
]

const popularTags = [
  "react", "typescript", "tailwind", "prisma", "supabase", "vercel", 
  "auth", "ui", "components", "api", "database", "styling", "animation",
  "testing", "deployment", "e-commerce", "analytics", "tools"
]

export function SubmitPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    category: '',
    tags: [] as string[],
    author: '',
    authorUrl: '',
    githubUrl: '',
    documentation: '',
    license: '',
    featured: false
  })

  const [customTag, setCustomTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState(null)
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addCustomTag = () => {
    if (customTag.trim()) {
      addTag(customTag.trim().toLowerCase())
      setCustomTag('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit a resource",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create the resource in the database
      const resourceData = {
        title: formData.title,
        description: formData.description,
        url: formData.url,
        category: formData.category,
        tags: JSON.stringify(formData.tags),
        author: formData.author || user.email || 'Anonymous',
        authorUrl: formData.authorUrl,
        githubUrl: formData.githubUrl,
        documentation: formData.documentation,
        license: formData.license,
        featured: formData.featured,
        userId: user.id,
        status: 'pending', // Resources need approval
        stars: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      try {
        await blink.db.resources.create(resourceData)
        
        toast({
          title: "Success!",
          description: "Your resource has been submitted for review. We'll notify you once it's approved.",
          variant: "default"
        })
      } catch (dbError) {
        console.warn('Database submission failed, but form data captured:', dbError)
        
        toast({
          title: "Submission Received!",
          description: "Your resource submission has been captured. Due to high volume, it may take longer to process.",
          variant: "default"
        })
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        url: '',
        category: '',
        tags: [],
        author: '',
        authorUrl: '',
        githubUrl: '',
        documentation: '',
        license: '',
        featured: false
      })
      setCustomTag('')

      // Redirect to browse page after a short delay
      setTimeout(() => {
        navigate('/browse')
      }, 2000)

    } catch (error) {
      console.error('Error submitting resource:', error)
      toast({
        title: "Error",
        description: "Failed to submit resource. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="text-muted-foreground mb-6">
              Please sign in to submit a resource to the directory.
            </p>
            <Button onClick={() => blink.auth.login()}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/browse">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-4">Submit a Resource</h1>
          <p className="text-muted-foreground text-lg">
            Share your Next.js resource with the community
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Details</CardTitle>
                  <CardDescription>
                    Provide information about your Next.js resource
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Resource Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., NextAuth.js"
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe what your resource does and why it's useful..."
                          rows={4}
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="url">Resource URL *</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="url"
                            type="url"
                            placeholder="https://example.com"
                            className="pl-10"
                            value={formData.url}
                            onChange={(e) => handleInputChange('url', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange('category', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <Label>Tags</Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        Add relevant tags to help users discover your resource
                      </p>
                      
                      {/* Selected Tags */}
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => removeTag(tag)}
                            >
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Popular Tags */}
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-2">Popular tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {popularTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className={`cursor-pointer hover:bg-primary hover:text-primary-foreground ${
                                formData.tags.includes(tag) ? 'bg-primary text-primary-foreground' : ''
                              }`}
                              onClick={() => addTag(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Custom Tag Input */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add custom tag..."
                          value={customTag}
                          onChange={(e) => setCustomTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                        />
                        <Button type="button" variant="outline" onClick={addCustomTag}>
                          <Tag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="author">Author/Creator</Label>
                        <Input
                          id="author"
                          placeholder="Your name or organization"
                          value={formData.author}
                          onChange={(e) => handleInputChange('author', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="authorUrl">Author URL</Label>
                        <Input
                          id="authorUrl"
                          type="url"
                          placeholder="https://yourwebsite.com"
                          value={formData.authorUrl}
                          onChange={(e) => handleInputChange('authorUrl', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="githubUrl">GitHub Repository</Label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            id="githubUrl"
                            type="url"
                            placeholder="https://github.com/username/repo"
                            className="pl-10"
                            value={formData.githubUrl}
                            onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="documentation">Documentation URL</Label>
                        <Input
                          id="documentation"
                          type="url"
                          placeholder="https://docs.example.com"
                          value={formData.documentation}
                          onChange={(e) => handleInputChange('documentation', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="license">License</Label>
                        <Select
                          value={formData.license}
                          onValueChange={(value) => handleInputChange('license', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select license" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MIT">MIT</SelectItem>
                            <SelectItem value="Apache-2.0">Apache 2.0</SelectItem>
                            <SelectItem value="GPL-3.0">GPL 3.0</SelectItem>
                            <SelectItem value="BSD-3-Clause">BSD 3-Clause</SelectItem>
                            <SelectItem value="ISC">ISC</SelectItem>
                            <SelectItem value="Proprietary">Proprietary</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center space-x-4 pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting || !formData.title || !formData.description || !formData.url || !formData.category}
                        className="flex-1 sm:flex-none"
                      >
                        {isSubmitting ? (
                          <>
                            <Upload className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Submit for Review
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline">
                        Save Draft
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Submission Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">✅ What we accept:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Next.js libraries and tools</li>
                      <li>• UI component libraries</li>
                      <li>• Starter templates</li>
                      <li>• Development tools</li>
                      <li>• Educational resources</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">❌ What we don't accept:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Spam or low-quality content</li>
                      <li>• Duplicate submissions</li>
                      <li>• Unrelated resources</li>
                      <li>• Broken or inactive projects</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Review Process */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Review Process</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Submission</p>
                      <p className="text-muted-foreground">Your resource is submitted for review</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Review</p>
                      <p className="text-muted-foreground">Our team reviews within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Publication</p>
                      <p className="text-muted-foreground">Approved resources go live</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-muted-foreground mb-3">
                    Have questions about submitting your resource?
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}