import { defaultLang, labels } from "./labels";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in labels) return lang as keyof typeof labels;
  return defaultLang;
}

function getNestedTranslation(obj: any, key: string): any {
  return key.split(".").reduce((o, i) => (o ? o[i] : undefined), obj);
}

export function useTranslations(lang: keyof typeof labels) {
  return function t(key: string) {
    const translation = getNestedTranslation(labels[lang], key);
    if (translation !== undefined) return translation;
    return getNestedTranslation(labels[defaultLang], key);
  };
}

export const idIsOfLanguage = (id: string, lang: string) => {
  return id.indexOf(`${lang}/`) > -1;
};

// Select the current-language value from a localized `{ de, en }` field.
export const pick = <T>(
  field: { de: T; en: T },
  lang: keyof typeof labels,
): T => field[lang];
