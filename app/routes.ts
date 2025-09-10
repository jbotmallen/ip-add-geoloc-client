import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "./routes/login.tsx"),
    route("/register", "./routes/register.tsx"),
    route("/.well-known/appspecific/com.chrome.devtools.json", "./routes/empty.tsx")
] satisfies RouteConfig;
