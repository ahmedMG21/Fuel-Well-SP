
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "./store/Providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fuel well",
  description: "nutrtion facts information for products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
           {children} 
          </Providers>
        </body>
    </html>
  );
}
