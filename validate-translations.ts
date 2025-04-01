import { labels } from "./src/i18n/labels";

type Languages = keyof typeof labels;

function flattenObject(obj: any, prefix = ""): Record<string, string> {
  return Object.keys(obj).reduce((acc: Record<string, string>, k) => {
    const pre = prefix.length ? `${prefix}.` : "";
    if (typeof obj[k] === "object" && obj[k] !== null) {
      Object.assign(acc, flattenObject(obj[k], `${pre}${k}`));
    } else {
      acc[`${pre}${k}`] = obj[k];
    }
    return acc;
  }, {});
}

function validateTranslations() {
  const languages = Object.keys(labels) as Languages[];
  const referenceLanguage = languages[0];
  const referenceKeys = Object.keys(
    flattenObject(labels[referenceLanguage]),
  ).sort();

  const errors: string[] = [];

  languages.forEach((lang) => {
    const currentLabels = labels[lang];
    const currentKeys = Object.keys(flattenObject(currentLabels)).sort();

    // Find missing keys
    const missingKeys = referenceKeys.filter(
      (key) => !currentKeys.includes(key),
    );
    if (missingKeys.length > 0) {
      errors.push(
        `Language "${lang}":\n    Missing translations for:\n      ${missingKeys.join("\n      ")}`,
      );
    }

    // Find extra keys
    const extraKeys = currentKeys.filter((key) => !referenceKeys.includes(key));
    if (extraKeys.length > 0) {
      errors.push(
        `Language "${lang}":\n    Extra translations found:\n      ${extraKeys.join("\n      ")}`,
      );
    }
  });

  if (errors.length > 0) {
    errors.forEach((error) => console.error(error + "\n"));
    throw Error("\n❌ Translation validation failed:\n");
  } else {
    console.log(
      "\n✅ All translations are complete and match the reference language.\n",
    );
  }
}

// Run the validation
validateTranslations();
