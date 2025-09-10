import { createContext, useContext } from "react";
import { useIPGeolocation } from "@/hooks/useIpGeoLocation";

type GeoContextType = ReturnType<typeof useIPGeolocation>;

const GeoContext = createContext<GeoContextType | null>(null);

export function GeoLocationProvider({ children }: { children: React.ReactNode }) {
    const geo = useIPGeolocation();
    return <GeoContext.Provider value={geo}>{children}</GeoContext.Provider>;
}

export function useGeo() {
    const ctx = useContext(GeoContext);
    if (!ctx) throw new Error("useGeo must be used inside GeoLocationProvider");
    return ctx;
}
