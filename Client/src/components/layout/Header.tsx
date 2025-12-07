import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Heart,
  User,
  Calendar,
  BookOpen,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Check Auth Status
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // "doctor" or "patient"
  const isLoggedIn = !!token;

  const navigation = [
    { name: "Ana Sayfa", href: "/", icon: Heart },
    { name: "Terapistler", href: "/therapists", icon: User },
    { name: "Randevu Al", href: "/book", icon: Calendar },
    { name: "Blog", href: "/blog", icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  // 2. Determine Dashboard Link based on Role
  const getDashboardLink = () => {
    return userRole === "doctor" ? "/dashboard/therapist" : "/dashboard/client";
  };

  // 3. Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // We force a reload or navigate to ensure the UI updates immediately
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container-therapeutic" aria-label="Ana navigasyon">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="VolunTherapy Ana Sayfa"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
              <Heart
                className="h-5 w-5 text-primary-foreground"
                aria-hidden="true"
              />
            </div>
            <span className="text-xl font-bold text-foreground">
              Volun<span className="text-primary">Therapy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive(item.href)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons (SMART LOGIC) */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {isLoggedIn ? (
              // LOGGED IN STATE
              <>
                <Button variant="outline" size="sm" asChild className="gap-2">
                  <Link to={getDashboardLink()}>
                    <LayoutDashboard className="h-4 w-4" />
                    Panelim
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2 text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Çıkış Yap
                </Button>
              </>
            ) : (
              // LOGGED OUT STATE
              <>
                <Button variant="therapeutic-secondary" size="sm" asChild>
                  <Link to="/login/client">Danışan Girişi</Link>
                </Button>
                <Button variant="therapeutic" size="sm" asChild>
                  <Link to="/login/therapist">Terapist Girişi</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            "overflow-hidden transition-all duration-300 md:hidden",
            isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <div className="space-y-1 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.name}
              </Link>
            ))}

            <div className="flex flex-col gap-2 pt-4 border-t mt-2">
              {isLoggedIn ? (
                // MOBILE LOGGED IN
                <>
                  <Button variant="outline" asChild className="justify-start">
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Panelim
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Çıkış Yap
                  </Button>
                </>
              ) : (
                // MOBILE LOGGED OUT
                <>
                  <Button variant="therapeutic-secondary" asChild>
                    <Link
                      to="/login/client"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Danışan Girişi
                    </Link>
                  </Button>
                  <Button variant="therapeutic" asChild>
                    <Link
                      to="/login/therapist"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Terapist Girişi
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
