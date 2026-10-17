import en from './en';
import ja from './ja';

// Add a language: create content/<code>.js with the same shape as en.js and
// list it here. Pages are generated at /<code>/ for each one.
export const dictionaries = { en, ja };
export const languages = Object.keys(dictionaries);
export const defaultLang = 'en';

export const languageNames = { en: 'English', ja: '日本語' };

export function getContent(lang) {
  return dictionaries[lang] || dictionaries[defaultLang];
}

// Contact details shared by every language.
export const site = {
  name: 'Lorenz Ras',
  brand: 'LenzLab',
  email: 'contact@lenzlab.com',
  url: 'https://www.lenzlab.com',
};
