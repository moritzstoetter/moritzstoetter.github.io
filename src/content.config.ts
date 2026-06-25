import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Derive the entry id from its file path (lang/<name>), stripping the
// extension. Without this, the glob loader would use a `slug` field present in
// the JSON data as the id, dropping the language prefix and colliding across
// the de/en variants.
const pathId = ({ entry }: { entry: string }) => entry.replace(/\.[^.]+$/, "");

const insightsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/insights", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      imageAlt: z.string(),
      author: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
    }),
});

export interface Insight {
  title: string;
  image: {
    src: string;
    width: number;
    height: number;
    format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
  };
  imageAlt: string;
  author: string;
  date: Date;
  tags: string[];
}

const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/about", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      members: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          image: image(),
        }),
      ),
    }),
});

export interface TeamMember {
  name: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
    format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
  };
}

export interface About {
  members: TeamMember[];
}

const caseStudiesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/case-studies", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      about: z.string(),
      challenge: z.string(),
      deliveredValue: z.string(),
      product: z.string(),
      tech: z.array(z.string()),
      testimonials: z.array(z.number()),
      image: image(),
    }),
});

export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  about: string;
  challenge: string;
  deliveredValue: string;
  product: string;
  tech: string[];
  testimonials: number[];
  image: {
    src: string;
    width: number;
    height: number;
    format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
  };
}

const expertiseCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/expertise", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      tech: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          // Empty string allowed as a placeholder for tech without a logo yet.
          image: z.union([z.literal(""), image()]),
        }),
      ),
      image: image(),
      tags: z.array(z.string()),
    }),
});

export interface Tech {
  name: string;
  description: string;
  image:
    | {
        src: string;
        width: number;
        height: number;
        format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
      }
    | "";
}

export interface Expertise {
  slug: string;
  title: string;
  description: string;
  tech: Tech[];
  image: {
    src: string;
    width: number;
    height: number;
    format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
  };
  tags: string[];
}

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/testimonials", generateId: pathId }),
  schema: ({ image }) =>
    z.object({
      identifier: z.number(),
      name: z.string(),
      subheading: z.string(),
      quote: z.string(),
      image: image(),
    }),
});

export interface Testimonial {
  identifier: number;
  name: string;
  subheading: string;
  quote: string;
  image: {
    src: string;
    width: number;
    height: number;
    format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
  };
}

export const collections = {
  insights: insightsCollection,
  about: aboutCollection,
  "case-studies": caseStudiesCollection,
  expertise: expertiseCollection,
  testimonials: testimonialsCollection,
};
