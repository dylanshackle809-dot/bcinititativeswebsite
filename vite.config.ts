// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // The wrapper only wires up the Nitro deploy plugin inside the Lovable sandbox unless
  // `nitro` is set explicitly. Passing an object both (a) force-enables it for CI builds
  // (e.g. Vercel) and (b) overrides the bundled `defaultPreset: "cloudflare-module"`.
  // Swap "vercel" for "netlify" to target Netlify instead.
  nitro: {
    preset: "vercel",
  },
});
