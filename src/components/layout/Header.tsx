import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Menu, X, Plus, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl">Next.js Directory</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-sm font-medium hover:text-primary transition-colors">
              Browse
            </Link>
            <Link to="/directories" className="text-sm font-medium hover:text-primary transition-colors">
              Directories
            </Link>
            <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resources..."
                className="pl-10 pr-4"
                onFocus={() => setIsSearchOpen(true)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Search className="h-4 w-4" />
            </Button>
            
            <Button asChild size="sm">
              <Link to="/submit">
                <Plus className="h-4 w-4 mr-2" />
                Submit
              </Link>
            </Button>

            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link to="/browse" className="text-sm font-medium hover:text-primary transition-colors">
                    Browse
                  </Link>
                  <Link to="/directories" className="text-sm font-medium hover:text-primary transition-colors">
                    Directories
                  </Link>
                  <Link to="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                    Pricing
                  </Link>
                  <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                    About
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}