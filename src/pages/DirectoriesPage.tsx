import { useState } from 'react'
import { Plus, Edit2, Trash2, Folder, Users, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

interface Directory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  resourceCount: number
  createdBy: string
  createdAt: string
  isPublic: boolean
}

const initialDirectories: Directory[] = [
  {
    id: '1',
    name: 'UI Components',
    description: 'Reusable UI components and component libraries',
    icon: '🎨',
    color: '#3b82f6',
    resourceCount: 245,
    createdBy: 'Admin',
    createdAt: '2024-01-01',
    isPublic: true
  },
  {
    id: '2',
    name: 'Authentication',
    description: 'Authentication libraries and solutions',
    icon: '🔐',
    color: '#10b981',
    resourceCount: 89,
    createdBy: 'Admin',
    createdAt: '2024-01-01',
    isPublic: true
  },
  {
    id: '3',
    name: 'Database',
    description: 'Database tools, ORMs, and data management',
    icon: '🗄️',
    color: '#f59e0b',
    resourceCount: 156,
    createdBy: 'Admin',
    createdAt: '2024-01-01',
    isPublic: true
  },
  {
    id: '4',
    name: 'E-commerce',
    description: 'E-commerce platforms and shopping solutions',
    icon: '🛒',
    color: '#ef4444',
    resourceCount: 78,
    createdBy: 'Admin',
    createdAt: '2024-01-01',
    isPublic: true
  }
]

const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Yellow' },
  { value: '#ef4444', label: 'Red' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#f97316', label: 'Orange' },
  { value: '#84cc16', label: 'Lime' }
]

const iconOptions = [
  '🎨', '🔐', '🗄️', '🛒', '📊', '🚀', '🧪', '✨', 
  '⚡', '🔧', '📱', '💻', '🌐', '📝', '🎯', '🔍',
  '📦', '🎪', '🎭', '🎨', '🎵', '🎮', '🏆', '💎'
]

export function DirectoriesPage() {
  const [directories, setDirectories] = useState<Directory[]>(initialDirectories)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingDirectory, setEditingDirectory] = useState<Directory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📁',
    color: '#3b82f6',
    isPublic: true
  })

  const filteredDirectories = directories.filter(dir =>
    dir.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dir.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateDirectory = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Directory name is required",
        variant: "destructive"
      })
      return
    }

    const newDirectory: Directory = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      color: formData.color,
      resourceCount: 0,
      createdBy: 'You',
      createdAt: new Date().toISOString().split('T')[0],
      isPublic: formData.isPublic
    }

    setDirectories(prev => [...prev, newDirectory])
    setIsCreateDialogOpen(false)
    resetForm()
    
    toast({
      title: "Success",
      description: "Directory created successfully"
    })
  }

  const handleEditDirectory = () => {
    if (!editingDirectory || !formData.name.trim()) return

    setDirectories(prev => prev.map(dir => 
      dir.id === editingDirectory.id 
        ? { ...dir, ...formData }
        : dir
    ))
    
    setEditingDirectory(null)
    resetForm()
    
    toast({
      title: "Success",
      description: "Directory updated successfully"
    })
  }

  const handleDeleteDirectory = (id: string) => {
    setDirectories(prev => prev.filter(dir => dir.id !== id))
    toast({
      title: "Success",
      description: "Directory deleted successfully"
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: '📁',
      color: '#3b82f6',
      isPublic: true
    })
  }

  const openEditDialog = (directory: Directory) => {
    setEditingDirectory(directory)
    setFormData({
      name: directory.name,
      description: directory.description,
      icon: directory.icon,
      color: directory.color,
      isPublic: directory.isPublic
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Directories</h1>
            <p className="text-muted-foreground text-lg">
              Manage and organize resource categories
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Directory
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Directory</DialogTitle>
                <DialogDescription>
                  Create a new category to organize resources
                </DialogDescription>
              </DialogHeader>
              <DirectoryForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateDirectory}
                onCancel={() => {
                  setIsCreateDialogOpen(false)
                  resetForm()
                }}
                submitLabel="Create Directory"
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search directories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Directories</p>
                  <p className="text-2xl font-bold">{directories.length}</p>
                </div>
                <Folder className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Resources</p>
                  <p className="text-2xl font-bold">
                    {directories.reduce((sum, dir) => sum + dir.resourceCount, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Public Directories</p>
                  <p className="text-2xl font-bold">
                    {directories.filter(dir => dir.isPublic).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Your Directories</p>
                  <p className="text-2xl font-bold">
                    {directories.filter(dir => dir.createdBy === 'You').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Directories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectories.map((directory) => (
            <Card key={directory.id} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${directory.color}20`, color: directory.color }}
                    >
                      {directory.icon}
                    </div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {directory.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={directory.isPublic ? "default" : "secondary"}>
                          {directory.isPublic ? "Public" : "Private"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {directory.resourceCount} resources
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(directory)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDirectory(directory.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="mb-4">
                  {directory.description}
                </CardDescription>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Created by {directory.createdBy}</span>
                  <span>{new Date(directory.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDirectories.length === 0 && (
          <div className="text-center py-12">
            <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No directories found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first directory to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Directory
              </Button>
            )}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={!!editingDirectory} onOpenChange={() => setEditingDirectory(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Directory</DialogTitle>
              <DialogDescription>
                Update directory information
              </DialogDescription>
            </DialogHeader>
            <DirectoryForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleEditDirectory}
              onCancel={() => {
                setEditingDirectory(null)
                resetForm()
              }}
              submitLabel="Update Directory"
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

interface DirectoryFormProps {
  formData: {
    name: string
    description: string
    icon: string
    color: string
    isPublic: boolean
  }
  setFormData: (data: any) => void
  onSubmit: () => void
  onCancel: () => void
  submitLabel: string
}

function DirectoryForm({ formData, setFormData, onSubmit, onCancel, submitLabel }: DirectoryFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Directory Name *</Label>
        <Input
          id="name"
          placeholder="e.g., UI Components"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Describe what this directory contains..."
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="icon">Icon</Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon} value={icon}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <span>{icon}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="color">Color</Label>
          <Select
            value={formData.color}
            onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <span className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color.value }}
                    />
                    {color.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isPublic"
          checked={formData.isPublic}
          onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
          className="rounded"
        />
        <Label htmlFor="isPublic">Make this directory public</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit} disabled={!formData.name.trim()}>
          {submitLabel}
        </Button>
      </div>
    </div>
  )
}