import dotenv from 'dotenv'
dotenv.config()
export const metadata = {
  title: 'Keta',
  description: 'keta stuff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       {children}
      </body>
    </html>
  );
}
