'use client';

import { useEffect } from 'react';
import { defaultLang, languages } from '@/content';

export default function LanguageRedirect() {
  useEffect(() => {
    const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
    const match = prefs.map((p) => p?.slice(0, 2).toLowerCase()).find((p) => languages.includes(p));
    window.location.replace(`/${match || defaultLang}/`);
  }, []);
  return null;
}
