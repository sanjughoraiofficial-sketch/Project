import { Link, useLocation } from "react-router-dom";
import { Bike, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rent a Cycle", path: "/rent" },
    { name: "Pricing", path: "/pricing" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-kolkata-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-kolkata-yellow p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Bike className="w-6 h-6 text-kolkata-black" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tighter">
              RIDE<span className="text-kolkata-yellow">KOLKATA</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-medium transition-colors hover:text-kolkata-yellow",
                  location.pathname === link.path ? "text-kolkata-yellow" : "text-kolkata-black"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/dashboard" className="btn-primary py-2 px-5 flex items-center gap-2">
              <User className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-kolkata-black/5 px-4 py-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium",
                  location.pathname === link.path ? "text-kolkata-yellow" : "text-kolkata-black"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-center"
            >
              Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
