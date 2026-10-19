import en from './en';
import ja from './ja';
import { defaultLang } from './site';

export { defaultLang, languageNames, languages, site } from './site';

// Add a language: create content/<code>.js with the same shape as en.js and
// list it here and in content/site.js. Pages are generated at /<code>/ for each one.
// (Client components import '@/content/site' so the dictionaries stay server-side.)
export const dictionaries = { en, ja };

export function getContent(lang) {
  return dictionaries[lang] || dictionaries[defaultLang];
}
