// frontend/app/layout.js
import './globals.css';

export const metadata = {
  title: 'My Web App',
  description: 'A modern web app with React and Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
