import {defineCollection} from 'astro:content';
import {docsSchema, i18nSchema} from '@astrojs/starlight/schema';

const faq = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		keywords: z.string().or(z.array(z.string().or(z.number())).optional()),
		// Transform string to Date object
		date: z.string(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		author: z.string().optional(),
		category: z.string().optional()
	}),
});

const docs = defineCollection({ schema: docsSchema() });


export const collections = {
	docs,
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
	faq,
};
