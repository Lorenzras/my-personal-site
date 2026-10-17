import '../globals.css';

export const metadata = {
  title: 'LenzLab',
  description: 'LenzLab: system integration, business apps and secure AI. 日本語 / English.',
  metadataBase: new URL('https://www.lenzlab.com'),
  alternates: { languages: { en: '/en/', ja: '/ja/', 'x-default': '/en/' } },
  robots: { index: false, follow: true },
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
