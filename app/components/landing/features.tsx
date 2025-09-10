import { Shield, Zap, Globe, Users, Clock, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your location data is processed securely with no storage or tracking of personal information.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant results with our optimized geolocation API powered by IPinfo.io's global infrastructure.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Accurate location data for IP addresses worldwide with comprehensive geographical information.",
  },
  {
    icon: Users,
    title: "Developer Friendly",
    description: "Clean, simple interface that developers and non-technical users can easily understand and use.",
  },
  {
    icon: Clock,
    title: "Real-time Data",
    description: "Access up-to-date location information with timezone details and coordinate precision.",
  },
  {
    icon: Star,
    title: "Reliable Service",
    description: "Built on trusted geolocation services with 99.9% uptime and consistent performance.",
  },
]

export function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Everything you need for accurate geolocation detection and IP address lookup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`p-8 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
