import { Globe } from "lucide-react"

export function HeroHeader() {
    return (
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Globe className="w-4 h-4" />
                Geolocation Explorer
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
                Discover Your Digital
                <span className="text-blue-600 dark:text-blue-400"> Location</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-pretty">
                Explore geolocation data with precision. Get your current location or search any IP address to discover
                geographical information instantly.
            </p>
        </div>
    )
}
