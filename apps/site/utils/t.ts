import { TranslationValues } from "next-intl";
import en from "../messages/en.json";
import fr from "../messages/fr.json";
export const translate = (
  lang: string,
  key: string,
  values?: TranslationValues,
  namespace?: string
) => {
  const disctionary = lang === "en" ? en : fr;
  const path = [...(namespace ? namespace.split(".") : []), ...key.split(".")];
  const template = path.reduce((acc, key) => {
    return acc[key];
  }, disctionary);

  if (!template) {
    return key;
  }
  return template.replace(/{(\w+)}/g, (match, key) => {
    return values[key] || match;
  });
};
