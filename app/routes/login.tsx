import { GuestRoute } from "@/components/wrappers/guest-route";
import type { Route } from "./+types/home";
import Login from "@/auth/login";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router";
import { Loader } from "@/components/layout/loader";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login to Geo Ip" },
        { name: "description", content: "Authentication layer of Geo Ip. Sign-in to continue using the app." },
    ];
}

export default function LoginPage() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex flex-col h-screen items-center justify-center">
                <Loader size="lg" className="text-gray-500" />
                <p className="mt-4 text-gray-500">Loading...</p>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/" replace />;
    }
    
    return (
        <Login />
    );
}

