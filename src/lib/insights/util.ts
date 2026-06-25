import { getCollection } from "astro:content";
import { isBefore } from "date-fns";
import { idIsOfLanguage } from "../../i18n/utils";

export const findInsightsByTags = async (
  lang: "de" | "en",
  tags: string[],
  excludeSlug?: string, // this can exclude the current insight from the list
) => {
  const insights = await getCollection("insights");

  // filter by language and tags and sort by date, pick first 3 max results
  return insights
    .filter((insight) =>
      (!!excludeSlug ? insight.id.split("/")[1] !== excludeSlug : true) &&
      idIsOfLanguage(insight.id, lang) &&
      tags.some((tag) => insight.data.tags.includes(tag)),
    )
    .sort((a, b) =>
      isBefore(new Date(a.data.date), new Date(b.data.date)) ? 1 : -1,
    )
    .slice(0, 3);
};
