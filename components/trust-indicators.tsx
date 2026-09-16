import { Shield, Clock } from "lucide-react"

const stats = [
  {
    icon: Clock,
    value: "20+",
    label: "Years Experience",
  },

  {
    icon: Shield,
    value: "5 Star",
    label: "Customer Rating",
  },
]

export function TrustIndicators() {
  return (
    <section className="bg-card py-8 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <stat.icon className="w-8 h-8 text-primary mb-2" />
              <span className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
