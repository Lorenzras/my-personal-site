import LanguageRedirect from '@/components/LanguageRedirect';
import { languageNames, languages } from '@/content';

// "/" picks a language from the browser and redirects to /en/, /ja/, ...
export default function Root() {
  return (
    <main className="redirect">
      <LanguageRedirect />
      <p className="logo">LENZ<span>LAB</span></p>
      <nav>
        {languages.map((l) => (
          <a key={l} href={`/${l}/`} hrefLang={l}>{languageNames[l]}</a>
        ))}
      </nav>
    </main>
  );
}
