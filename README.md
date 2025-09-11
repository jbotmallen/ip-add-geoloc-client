# IP Address Geolocation Client

A client-side web application built with React and React Router that retrieves and displays geolocation information for IP addresses. Deployed on Vercel: https://ip-add-geoloc-client.vercel.app/

##  Project Stack
- **Language & Bundler**: TypeScript, Vite  
- **Client-side Routing**: React Router (v7)  
- **Styling**: Tailwind CSS (with `@tailwindcss/vite`)  
- **UI Libraries**: Radix UI components, Framer Motion, Sonner  
- **Forms & Validation**: React Hook Form, Zod, @hookform/resolvers  
- **HTTP Client**: Axios  
- **Utilities**: clsx, class-variance-authority, dotted-map, motion, next-themes  

##  Prerequisites
Ensure you have the following installed:
- Node.js (v18 or newer recommended)
- npm (comes bundled with Node.js)
- Optional: `pnpm` or `yarn` if you prefer those package managers

##  Installation & Local Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/jbotmallen/ip-add-geoloc-client.git
   cd ip-add-geoloc-client
````

2. Install dependencies:

   ```bash
   npm install
   ```

   *Alternatively, if using Yarn or pnpm:*

   ```bash
   yarn install
   # or
   pnpm install
   ```

3. Start the development server with hot-reloading:

   ```bash
   npm run dev
   ```

   This launches Vite in development mode using React Router's dev server.

4. Open your browser and visit `http://localhost:5173` (or whichever port Vite assigns).

## Available Scripts

The following npm scripts are defined in `package.json`:

| Script              | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| `npm run dev`       | Runs the development server using React Router’s dev feature                      |
| `npm run build`     | Builds the production version of the app using React Router build                 |
| `npm start`         | Serves the production build via React Router serve: `./build/server/index.js`     |
| `npm run typecheck` | Generates types via React Router (`typegen`) and runs TypeScript compiler (`tsc`) |

## Environment Variables

No environment variables are required—unless your app uses external API keys or custom configurations, which are not listed here.

## Deployment

The app is currently deployed on **Vercel**, configured to serve the build output automatically:

* Visit live demo: [https://ip-add-geoloc-client.vercel.app/](https://ip-add-geoloc-client.vercel.app/)
* Automatic deployments on push to the default branch (e.g., `main` or `master`).

## Notes & Tips

* The project leverages **ES module** syntax thanks to `"type": "module"` in `package.json`.
* React Router v7 offers integrated data loading, routing, and potentially backend support via `@react-router/node` and `@react-router/serve`.
* Tailwind integrated via the `@tailwindcss/vite` plugin ensures fast utility-first styling.
* If you expand routing or API integration, consider creating separate `.env` placeholders (e.g., `.env.local`) for local configs.

## Contributing

Contributions are welcome! Whether it’s bug fixes, feature improvements, or simply feedback—feel free to open an issue or submit a pull request.

## License

Specify the license here, e.g., MIT.

---

### Quick Start Recap

```bash
git clone <repo-url>
cd ip-add-geoloc-client
npm install
npm run dev
```

Feel free to let me know if you’d like additions like:

* Example JSDoc annotations
* CI/CD details for Vercel
* Customizing theme, localization, or API sources

Happy coding!
