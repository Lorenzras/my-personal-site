import '../globals.css';

export const metadata = { title: 'LenzLab', icons: { icon: '/icon.svg' } };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
