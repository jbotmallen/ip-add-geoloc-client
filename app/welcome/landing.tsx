import { HeroHeader } from "@/components/landing/header"
import { CurrentLocationCard } from "@/components/landing/current-location"
import { IpSearchCard } from "@/components/landing/ip-search-card"
import { Map } from "@/components/landing/map";
import { useGeo } from "@/context/GeoLocationContext";
import { motion } from "framer-motion";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";

export function Landing() {
    const { geoData, searchedGeoIpData } = useGeo();

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="relative min-h-screen">
            <div className="w-full max-w-5xl mx-auto px-4 py-16 space-y-12">
                {/* Hero Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                >
                    <HeroHeader />
                </motion.div>

                {/* Cards */}
                <motion.div
                    className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <CurrentLocationCard />
                    <IpSearchCard />
                </motion.div>

                {/* Current Location Map */}
                <motion.div
                    className="max-w-4xl mx-auto mt-10 space-y-3 scroll-pt-96"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    id="current-location-map"
                >
                    <h1 className="text-2xl font-bold">
                        Your Current IP Geolocation
                    </h1>
                    <p className="text-sm italic text-primary-foreground">Scroll up when hovering to zoom in. Scroll down otherwise.</p>
                    <Map geoData={geoData} isSearched={false} />
                </motion.div>

                {/* Searched Location Map */}
                <motion.div
                    className="max-w-4xl mx-auto mt-10 space-y-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                    id="searched-location-map"
                >
                    <h1 className="text-2xl font-bold">
                        Searched IP Geolocation
                    </h1>
                    <p className="text-sm italic text-primary-foreground">Scroll up when hovering to zoom in. Scroll down otherwise.</p>
                    <Map geoData={searchedGeoIpData} isSearched={true} />
                </motion.div>

                <HowItWorks />
                <Features />
            </div>
        </div>
    )
}
