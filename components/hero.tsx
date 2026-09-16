"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToQuote = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden">
      {/* Navigation Bar */}
      <nav className="relative z-20 bg-card/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold tracking-tight text-black">
                <span style={{ color: "#E0202A" }}>PLATINUM</span> AZ TURF
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection("services")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("gallery")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection("testimonials")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="text-foreground/80 hover:text-primary font-medium transition-colors"
              >
                FAQ
              </button>
              <Button 
                onClick={scrollToQuote}
                className="bg-[#061E11] hover:bg-[#061E11]/90 text-white"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors text-left py-2"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection("gallery")}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors text-left py-2"
                >
                  Gallery
                </button>
                <button 
                  onClick={() => scrollToSection("testimonials")}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors text-left py-2"
                >
                  Testimonials
                </button>
                <button 
                  onClick={() => scrollToSection("faq")}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors text-left py-2"
                >
                  FAQ
                </button>
                <Button 
                  onClick={scrollToQuote}
                  className="bg-[#061E11] hover:bg-[#061E11]/90 text-white w-full"
                >
                  Get a Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Backyard remodel with artificial turf, fire pit seating area, and covered patio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/65 to-foreground/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center py-16">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#F37335] to-[#FDC830] text-white text-sm font-semibold tracking-wider uppercase rounded shadow-sm">
              Arizona&apos;s Trusted Backyard Experts
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-[45px] md:text-5xl lg:text-6xl font-black text-card mb-6 leading-tight text-balance">
            CUSTOM BACKYARDS. NO RUNAROUND.
            <span className="block bg-gradient-to-b from-[#FDC830] to-[#F37335] bg-clip-text text-transparent">
              PRICED UPFRONT.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-card/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Envisioned by you. Watch your  backyard transform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-[#061E11] hover:bg-[#061E11]/90 text-white"
              onClick={scrollToQuote}
            >
              Get a Free Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 bg-card/10 border-card border-2 text-card font-semibold hover:bg-card hover:text-foreground"
              onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Our Work
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-10 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-card/60 flex items-start justify-center p-1.5 mx-auto">
              <div className="w-1 h-2.5 bg-card/80 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
