import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Derive the entry id from its file path, stripping the extension. For insights
// (still split per language) this yields `lang/<name>`; for the merged data
// collections it yields just `<name>` (the slug).
const pathId = ({ entry }: { entry: string }) => entry.replace(/\.[^.]+$/, "");

// A field carried in both languages. Both are required, so a missing
// translation fails the build — structural protection against drift.
const localized = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({ de: schema, en: schema });
export type Localized<T> = { de: T; en: T };

interface ImageMeta {
  src: string;
  width: number;
  height: number;
  format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
}

const insightsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/insights", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      author: z.string(),
      date: z.date(),
      // Explicitly linked related insights, by slug (filename).
      insights: z.array(z.string()).default([]),
    }),
});

export interface Insight {
  title: string;
  subtitle?: string;
  description: string;
  image: ImageMeta;
  imageAlt: string;
  author: string;
  date: Date;
  insights: string[];
}

const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/about", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      members: z.array(
        z.object({
          name: z.string(),
          subtitle: localized(z.string()).optional(),
          description: localized(z.string()),
          image: image(),
        }),
      ),
    }),
});

export interface TeamMember {
  name: string;
  subtitle?: Localized<string>;
  description: Localized<string>;
  image: ImageMeta;
}

export interface About {
  members: TeamMember[];
}

const caseStudiesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/case-studies", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      client: z.string(),
      image: image(),
      tech: z.array(z.string()),
      // Explicitly linked testimonials, by slug (filename).
      testimonials: z.array(z.string()),
      title: localized(z.string()),
      description: localized(z.string()),
      about: localized(z.string()),
      challenge: localized(z.string()),
      deliveredValue: localized(z.string()),
      product: localized(z.array(z.string())),
    }),
});

export interface CaseStudy {
  slug: string;
  client: string;
  image: ImageMeta;
  tech: string[];
  testimonials: string[];
  title: Localized<string>;
  description: Localized<string>;
  about: Localized<string>;
  challenge: Localized<string>;
  deliveredValue: Localized<string>;
  product: Localized<string[]>;
}

const expertiseCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/expertise", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      image: image(),
      // Explicitly linked related insights / case studies, by slug (filename).
      insights: z.array(z.string()).default([]),
      case_studies: z.array(z.string()).default([]),
      title: localized(z.string()),
      description: localized(z.string()),
      tech: z.array(
        z.object({
          name: localized(z.string()),
          subtitle: localized(z.string()).optional(),
          description: localized(z.string()),
          // Empty string allowed as a placeholder for tech without a logo yet.
          image: z.union([z.literal(""), image()]),
        }),
      ),
    }),
});

export interface Tech {
  name: Localized<string>;
  subtitle?: Localized<string>;
  description: Localized<string>;
  image: ImageMeta | "";
}

export interface Expertise {
  slug: string;
  image: ImageMeta;
  insights: string[];
  case_studies: string[];
  title: Localized<string>;
  description: Localized<string>;
  tech: Tech[];
}

const industriesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/industries", generateId: pathId }),
  schema: () =>
    z.object({
      slug: z.string(),
      // Filename stem (without extension) in src/assets/industry-icons/.
      icon: z.string(),
      title: localized(z.string()),
      description: localized(z.string()),
    }),
});

export interface Industry {
  slug: string;
  icon: string;
  title: Localized<string>;
  description: Localized<string>;
}

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/testimonials", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      subheading: z.string(),
      image: image(),
      quote: localized(z.string()),
    }),
});

export interface Testimonial {
  name: string;
  subheading: string;
  image: ImageMeta;
  quote: Localized<string>;
}

export const collections = {
  insights: insightsCollection,
  about: aboutCollection,
  "case-studies": caseStudiesCollection,
  expertise: expertiseCollection,
  industries: industriesCollection,
  testimonials: testimonialsCollection,
};
