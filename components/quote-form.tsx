"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { trackFBEvent } from "@/components/facebook-pixel"

type FormStep = 1 | 2 | 3

interface FormData {
  name: string
  email: string
  phone: string
}

export function QuoteForm() {
  const [step, setStep] = useState<FormStep>(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, "")
    // Require exactly 10 digits, and reject obviously fake numbers
    // (all repeating digits like 5555555555, or numbers starting with 0/1
    // which are not valid US area codes)
    if (cleaned.length !== 10) return false
    if (/^0/.test(cleaned) || /^1/.test(cleaned)) return false
    if (/^(\d)\1{9}$/.test(cleaned)) return false
    return true
  }

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 10)
    const len = digits.length
    if (len === 0) return ""
    if (len < 4) return `(${digits}`
    if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleNext = () => {
    if (step < 3) setStep((step + 1) as FormStep)
  }

  const handlePrev = () => {
    if (step > 1) setStep((step - 1) as FormStep)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    const leadConnectorUrl = "https://services.leadconnectorhq.com/hooks/qPfcbKLjQTVPRhcC22Qq/webhook-trigger/ddf35372-3213-4ab5-811e-5d0b2d7efc4d"
    const zapierUrl = "https://hooks.zapier.com/hooks/catch/24750736/4y2c0hj/"

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      submittedAt: new Date().toISOString(),
    }

    try {
      await fetch(leadConnectorUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.log("[v0] LeadConnector webhook error:", err)
    }

    try {
      await fetch(zapierUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      console.log("[v0] Zapier webhook error:", err)
    }

    trackFBEvent("Lead", {
      content_category: "Quote Request",
      content_name: payload.name,
    })

    setSubmitted(true)
    setIsSubmitting(false)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name !== ""
      case 2:
        if (formData.email === "") return false
        return validateEmail(formData.email)
      case 3:
        return validatePhone(formData.phone)
      default:
        return true
    }
  }

  const handleEmailChange = (value: string) => {
    setFormData({ ...formData, email: value })
    if (value && value.includes("@") && !validateEmail(value)) {
      setErrors({ ...errors, email: "Please enter a valid email address" })
    } else {
      setErrors({ ...errors, email: undefined })
    }
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    setFormData({ ...formData, phone: formatted })
    const digits = formatted.replace(/\D/g, "")
    if (digits.length === 0) {
      setErrors({ ...errors, phone: undefined })
    } else if (digits.length < 10) {
      setErrors({ ...errors, phone: "Phone number must be 10 digits" })
    } else if (!validatePhone(formatted)) {
      setErrors({ ...errors, phone: "Please enter a valid phone number" })
    } else {
      setErrors({ ...errors, phone: undefined })
    }
  }

  if (submitted) {
    return (
      <section id="quote-form" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 md:p-12 text-center bg-card">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground mb-4">
              Thank You!
            </h2>
            <p className="text-muted-foreground text-lg">
              We&apos;ve received your request and will contact you within 24 hours to discuss your project.
            </p>
          </Card>
        </div>
      </section>
    )
  }

  const TOTAL_STEPS = 3

  return (
    <section id="quote-form" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-[27px] md:text-[40px] font-bold text-foreground mb-4">
            <span className="block text-[#FB9109] text-base font-extrabold uppercase tracking-wider mb-2">
              Have us give you a quote
            </span>
            <span className="block leading-[1.4]">Whether you have a Small</span>
            <span className="block leading-[1.4]">Or much BIGGER Backyard Project in Mind</span>
          </h2>
          <div className="w-16 h-px bg-muted-foreground/30 mx-auto my-4" />
          <p className="text-foreground text-base md:text-lg font-medium max-w-lg mx-auto">
            Fill out the form and we&apos;ll do the rest!<br />
            No pressure, no commitment.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  s < step
                    ? "bg-primary text-primary-foreground"
                    : s === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
            />
          </div>
        </div>

        <Card className="max-w-xl mx-auto p-5 md:p-6 bg-foreground border-foreground/80">

          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-background text-center mb-4">
                What&apos;s your name?
              </h3>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="py-5 bg-background/10 text-background placeholder:text-background/50 border-background/30"
              />
            </div>
          )}

          {/* Step 2: Email */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-background text-center mb-4">
                What&apos;s your email address?
              </h3>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={cn(
                    "py-5 bg-background/10 text-background placeholder:text-background/50",
                    errors.email ? "border-red-500" : "border-background/30"
                  )}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Phone */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-background text-center mb-4">
                Best phone number to reach you?
              </h3>
              <div className="space-y-2">
                <Input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength={14}
                  className={cn(
                    "py-5 bg-background/10 text-background placeholder:text-background/50",
                    errors.phone ? "border-red-500" : "border-background/30"
                  )}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step > 1 ? (
              <Button
                variant="ghost"
                onClick={handlePrev}
                className="gap-2 text-foreground/50 hover:text-background hover:bg-background/10"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="gap-2 bg-[#061E11] text-white hover:bg-[#061E11]/90"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="bg-[#061E11] text-white hover:bg-[#061E11]/90"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>

          {submitError && (
            <p className="text-red-400 text-sm text-center mt-4">{submitError}</p>
          )}
        </Card>
      </div>
    </section>
  )
}
