// Shared constants with no copy in them, so client components can import
// them without pulling every language's dictionary into the browser bundle.
// Add a language: list its name here and its dictionary in content/index.js.
export const languageNames = { en: 'English', ja: '日本語' };
export const languages = Object.keys(languageNames);
export const defaultLang = 'en';

// Contact details shared by every language.
export const site = {
  name: 'Lorenz Ras',
  brand: 'LenzLab',
  email: 'contact@lenzlab.com',
  url: 'https://www.lenzlab.com',
};
