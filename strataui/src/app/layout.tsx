import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StrataUI',
  description: 'A UI component library directory',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
