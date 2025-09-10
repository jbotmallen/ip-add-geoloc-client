import { NavigationBar } from "@/components/layout/navbar";
import type { Route } from "./+types/home";
import { ProtectedRoute } from "@/components/wrappers/protected-route";
import { Landing } from "@/welcome/landing";
import { GeoLocationProvider } from "@/context/GeoLocationContext";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Welcome to Geo Ip" },
    { name: "description", content: "Welcome to Geo Ip! A Geo IP lookup tool." },
  ];
}

export default function Home() {
  return (
    <ProtectedRoute>
      <GeoLocationProvider>
        <NavigationBar />
        <Landing />
      </GeoLocationProvider>
    </ProtectedRoute>
  );
}
