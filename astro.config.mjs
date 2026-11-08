import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.mohamadchehade.com",
  integrations: [sitemap()],
});
