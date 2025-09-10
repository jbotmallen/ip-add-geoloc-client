import { MapPin, Search, Globe, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

const steps = [
    {
        icon: MapPin,
        title: "Detect Location",
        description: "Automatically detect your current location using GPS and browser geolocation",
        delay: "0ms",
    },
    {
        icon: Search,
        title: "Search by IP",
        description: "Enter any IP address to discover its geographical location instantly",
        delay: "200ms",
    },
    {
        icon: Globe,
        title: "View Details",
        description: "Get comprehensive location data including coordinates, city, and timezone",
        delay: "400ms",
    },
    {
        icon: Zap,
        title: "Real-time Results",
        description: "Powered by IPinfo.io for accurate and up-to-date location information",
        delay: "600ms",
    },
]

export function HowItWorks() {
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
        <section ref={sectionRef} className="py-12 px-4 bg-transparent">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">How It Works</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Discover locations with precision and ease using our advanced geolocation technology
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {steps.map((step, index) => (
                        <Card
                            key={index}
                            className={`p-8 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-card border-border mx-auto max-w-md ${isVisible ? "animate-slide-up" : "opacity-0"
                                }`}
                            style={{ animationDelay: step.delay }}
                        >
                            <div className="w-20 h-20 mx-auto rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                <step.icon className="w-10 h-10 text-primary animate-float-icon" />
                            </div>
                            <h3 className="text-xl font-semibold text-card-foreground mb-3">{step.title}</h3>
                            <p className="text-muted-foreground text-pretty leading-relaxed">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
