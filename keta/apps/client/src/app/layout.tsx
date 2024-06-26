import dotenv from 'dotenv'
import { Header } from '../components/header/header';
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
    <html lang="en" style={{height: '100%'}}>
      <body style={{height: '100%'}}>
      <Header />
       {children}
      </body>
    </html>
  );
}
