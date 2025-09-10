"use client"

import { MapPin } from "lucide-react"

interface LoaderProps {
    size?: "sm" | "md" | "lg"
    className?: string
}

export function Loader({ size = "md", className = "" }: LoaderProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    }

    const containerSizes = {
        sm: "w-8 h-8",
        md: "w-16 h-16",
        lg: "w-24 h-24",
    }

    return (
        <div className={`relative inline-flex items-center justify-center ${containerSizes[size]} ${className}`}>
            {/* Floating clouds background */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
                <div
                    className="absolute top-1 left-0 w-2 h-1 bg-primary/20 rounded-full animate-float-clouds"
                    style={{ animationDelay: "0s" }}
                />
                <div
                    className="absolute top-2 right-0 w-1.5 h-0.5 bg-accent/30 rounded-full animate-float-clouds"
                    style={{ animationDelay: "2s" }}
                />
                <div
                    className="absolute bottom-1 left-0 w-1 h-0.5 bg-primary/15 rounded-full animate-float-clouds"
                    style={{ animationDelay: "4s" }}
                />
            </div>

            {/* Pulsing glow effect */}
            <div className={`absolute ${containerSizes[size]} rounded-full bg-accent/20 animate-pulse-glow`} />

            {/* Main map pin with bounce animation */}
            <div className="relative z-10">
                <MapPin
                    className={`${sizeClasses[size]} text-primary animate-bounce-gentle`}
                    style={{
                        filter: "drop-shadow(0 2px 4px rgba(249, 115, 22, 0.3))",
                        animationDelay: "0.5s",
                    }}
                />

                {/*  smile dot */}
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-accent rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            {/* Ripple effect */}
            <div
                className={`absolute ${containerSizes[size]} rounded-full border-2 border-primary/30 animate-ping`}
                style={{ animationDelay: "1.5s" }}
            />
        </div>
    )
}
