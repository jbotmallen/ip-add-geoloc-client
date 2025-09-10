import { GuestRoute } from "@/components/wrappers/guest-route";
import type { Route } from "./+types/home";
import Login from "@/auth/login";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Login to Geo Ip" },
        { name: "description", content: "Authentication layer of Geo Ip. Sign-in to continue using the app." },
    ];
}

export default function LoginPage() {
    return (
        <GuestRoute>
            <Login />
        </GuestRoute>
    );
}

