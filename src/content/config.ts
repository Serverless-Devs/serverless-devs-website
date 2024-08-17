import { defineCollection } from "astro:content";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";

const docs = defineCollection({ schema: docsSchema() });

export const collections = {
  docs,
  i18n: defineCollection({ type: "data", schema: i18nSchema() }),
};
