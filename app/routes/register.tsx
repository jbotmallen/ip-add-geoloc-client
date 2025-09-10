import Register from "@/auth/register";
import type { Route } from "./+types/home";
import { GuestRoute } from "@/components/wrappers/guest-route";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Register to Geo Ip" },
        { name: "description", content: "Authentication layer of Geo Ip. Sign-up on our app to continue." },
    ];
}

export default function RegisterPage() {
    return (
        <GuestRoute>
            <Register />
        </GuestRoute>
    );
}

