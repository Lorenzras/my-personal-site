import './globals.css';
import Shell from '@/components/Shell';
import { profile } from '@/content/site';

export const metadata = {
  title: 'Lorenz Ras · LenzLab',
  description: 'kintone packages, AI integrations on AWS Bedrock, and security basics for teams in Japan.',
  metadataBase: new URL('https://www.lenzlab.com'),
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
};

export const viewport = { themeColor: '#0b0d12' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Shell>
          {children}
          <footer className="footer">© {new Date().getFullYear()} {profile.name} · LenzLab</footer>
        </Shell>
      </body>
    </html>
  );
}
