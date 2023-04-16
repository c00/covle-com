import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import deno from "@astrojs/deno";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  output: "server",
  adapter: deno()
});