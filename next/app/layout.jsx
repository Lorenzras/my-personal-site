import './globals.css';

export const metadata = {
  title: 'Lorenz Ras · LenzLab',
  description: 'Full-stack software engineer in Japan who automates everything. Explore the 3D automation factory.',
  metadataBase: new URL('https://www.lenzlab.com'),
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
};

export const viewport = { themeColor: '#0a0c12' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
