// Wraps every page (server component): scroll progress bar, top nav and
// language switch. Only the progress bar, language switch, theme toggle and
// reveal observer are (tiny) client components.
import { site } from '@/content';
import { LangSwitch, ProgressBar, RevealObserver, ThemeToggle } from './Chrome';

export default function Shell({ lang, nav, themeLabel, children }) {
  return (
    <>
      <ProgressBar />
      <nav className="nav">
        <a href={`/${lang}/`} className="logo">LENZ<span>LAB</span></a>
        <div className="nav-links">
          <a href={`/${lang}/#problems`}>{nav.problems}</a>
          <a href={`/${lang}/#services`}>{nav.services}</a>
          <a href={`/${lang}/#integrations`}>{nav.integrations}</a>
          <a href={`/${lang}/#work`}>{nav.work}</a>
          <LangSwitch lang={lang} />
          <ThemeToggle label={themeLabel} />
          <a href={`mailto:${site.email}`} className="nav-cta">{nav.contact}</a>
        </div>
      </nav>
      {children}
      <RevealObserver />
    </>
  );
}
