import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  BellIcon, 
  MenuIcon, 
  X as CloseIcon,
  UserIcon,
  LogInIcon
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
              <span className="font-bold">FS</span>
            </div>
            <span className="hidden sm:inline-block text-xl font-bold">FoodShare</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/browse" className="text-foreground/80 hover:text-foreground transition-colors">
            Browse
          </Link>
          <Link to="/map" className="text-foreground/80 hover:text-foreground transition-colors">
            Map
          </Link>
          <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </Link>
          
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <BellIcon className="h-5 w-5" />
              </Button>
              <Link to="/profile">
                <Button variant="ghost" size="icon" aria-label="Profile">
                  <UserIcon className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-1">
                <LogInIcon className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
          
          <Link to="/create">
            <Button>Create Post</Button>
          </Link>
        </nav>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 border-t bg-background">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="px-2 py-1 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className="px-2 py-1 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <Link 
              to="/map" 
              className="px-2 py-1 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Map
            </Link>
            <Link 
              to="/how-it-works" 
              className="px-2 py-1 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/notifications" 
                  className="px-2 py-1 rounded-md hover:bg-muted transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BellIcon className="h-4 w-4" />
                  Notifications
                </Link>
                <Link 
                  to="/profile" 
                  className="px-2 py-1 rounded-md hover:bg-muted transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserIcon className="h-4 w-4" />
                  Profile
                </Link>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-2 py-1 rounded-md hover:bg-muted transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogInIcon className="h-4 w-4" />
                Login
              </Link>
            )}
            
            <Link 
              to="/create" 
              className="bg-primary text-primary-foreground px-3 py-2 rounded-md text-center font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Post
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
