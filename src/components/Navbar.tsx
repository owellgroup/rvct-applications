import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/rvtc_logo.png";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const links = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/apply", label: "Apply" },
    { to: user ? "/dashboard" : "/login", label: user ? "Dashboard" : "Login" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="RVTC Logo" className="h-12 w-12 rounded-full" />
          <div className="hidden sm:block">
            <h1 className="text-sm font-heading font-bold text-primary-foreground leading-tight">
              Rundu Vocational
            </h1>
            <p className="text-xs text-primary-foreground/70">Training Centre</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(l.to)
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground/90 hover:bg-primary-foreground/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-primary-foreground p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 fade-in">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium ${
                isActive(l.to)
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground/90 hover:bg-primary-foreground/10"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
