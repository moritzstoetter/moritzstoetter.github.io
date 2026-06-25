import { getCollection } from "astro:content";
import { isBefore } from "date-fns";
import { idIsOfLanguage } from "../../i18n/utils";

export const findBlogpostsByTags = async (
  lang: "de" | "en",
  tags: string[],
  excludeSlug?: string, // this can exclude the current blog post from the list
) => {
  const blogPosts = await getCollection("blog");

  // filter by language and tags and sort by date, pick first 3 max results
  return blogPosts
    .filter((post) =>
      (!!excludeSlug ? post.id.split("/")[1] !== excludeSlug : true) &&
      idIsOfLanguage(post.id, lang) &&
      tags.some((tag) => post.data.tags.includes(tag)),
    )
    .sort((a, b) =>
      isBefore(new Date(a.data.date), new Date(b.data.date)) ? 1 : -1,
    )
    .slice(0, 3);
};
