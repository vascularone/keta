import dotenv from 'dotenv'
import { Header } from '../components/header/header';
dotenv.config()
export const metadata = {
  title: 'Keta',
  description: 'keta stuff',
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { uname: string }
}>) {
  return (
    <html lang="en">
      <body>
      <Header />
       {children}
      </body>
    </html>
  );
}
