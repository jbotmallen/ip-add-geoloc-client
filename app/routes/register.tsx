import Register from "@/auth/register";
import type { Route } from "./+types/home";
import { GuestRoute } from "@/components/wrappers/guest-route";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/layout/loader";
import { Navigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Register to Geo Ip" },
        { name: "description", content: "Authentication layer of Geo Ip. Sign-up on our app to continue." },
    ];
}

export default function RegisterPage() {
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
        <Register />
    );
}

