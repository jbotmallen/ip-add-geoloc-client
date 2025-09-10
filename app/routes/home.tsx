import { NavigationBar } from "@/components/layout/navbar";
import type { Route } from "./+types/home";
import { ProtectedRoute } from "@/components/wrappers/protected-route";
import { Landing } from "@/welcome/landing";
import { GeoLocationProvider } from "@/context/GeoLocationContext";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/layout/loader";
import { Navigate, useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Welcome to Geo Ip" },
    { name: "description", content: "Welcome to Geo Ip! A Geo IP lookup tool." },
  ];
}

export default function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <Loader size="lg" className="text-gray-500" />
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user || user === null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <GeoLocationProvider>
      <NavigationBar />
      <Landing />
    </GeoLocationProvider>
  );
}
