"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ShinyButton } from "../ui/shiny-button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section id="navbar" className="fixed w-full top-0 z-50  backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 bg-transparent mt-1 border-2 rounded-lg">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="#" className="text-2xl font-bold text-[#1d293d]">
              Project
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 ">
            <NavLink to="#features">Features</NavLink>
            <NavLink to="#howItWorks">How It Works</NavLink>
            <NavLink to="#pricing">Pricing</NavLink>
            <NavLink to="#contact">Contact</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to={"/login"}><ShinyButton className="bg-[#cb4363]" >Login</ShinyButton></Link>
            
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-button"
              className="text-neutral-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink
                to="#features"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </MobileNavLink>
              <MobileNavLink
                to="#howItWorks"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </MobileNavLink>
              <MobileNavLink
                to="#toolsShowcase"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tools
              </MobileNavLink>
              <MobileNavLink
                to="#pricing"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </MobileNavLink>
              <MobileNavLink
                to="#contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </MobileNavLink>
              <div className="pt-4 space-y-2">
                <Link to={"/login"}><ShinyButton className="bg-[#cb4363] w-full" >Login</ShinyButton></Link>
              
              
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-[#1d293d] hover:text-black hover:scale-110 duration-100 transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 text-black transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
