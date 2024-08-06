import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ClientOnly from "@/components/ClientOnly";
import RainBackground from "@/components/RainBackground";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "buckets Flow",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={notoSansJP.className}>
        <ClientOnly>
          <RainBackground />
          <div
            className="
            fixed top-0 z-10
            h-full w-full
            bg-blue-800 bg-opacity-10
            flex flex-col
          "
          >
            <Header />
            <div className="flex-1 overflow-auto pt-20 pb-10 lg:mx-5 mx-3">
              {children}
            </div>
          </div>
        </ClientOnly>
      </body>
    </html>
  );
}
