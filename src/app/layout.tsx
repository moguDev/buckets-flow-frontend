import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import GoogleAnalytics from "@/components/googleAnalytics/GoogleAnalytics";
import { RecoilRootWrapper } from "@/components/MyComponents";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PrivacyPolicy, TermsModal } from "@/components/modals/TermsModal";

const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "buckets Flow | 雨音とポモドーロタイマーで、集中力と生産性を高めるアプリケーション",
  description:
    "雨音とポモドーロタイマーで集中力と生産性を高めるサービスです。作業時間を降水量として可視化しモチベーションの向上をサポートします。",
  openGraph: {
    title:
      "buckets Flow | 雨音とポモドーロタイマーで、集中力と生産性を高めるアプリケーション",
    description:
      "雨音とポモドーロタイマーで集中力と生産性を高めるサービスです。作業時間を降水量として可視化しモチベーションの向上をサポートします。",
    url: "https://buckets-flow.com",
    siteName: "buckets Flow",
    images: "./opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "buckets Flow | 雨音とポモドーロタイマーで、集中力と生産性を高めるアプリケーション",
    description:
      "雨音とポモドーロタイマーで集中力と生産性を高めるサービスです。作業時間を降水量として可視化しモチベーションの向上をサポートします。",
    images: "./opengraph-image.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#040612" />
        <GoogleAnalytics />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={`${notoSansJP.className}`}>
        <RecoilRootWrapper>
          <Header />
          <div className="pt-24 lg:px-16 px-5 w-full">{children}</div>
          <Footer />
          <TermsModal modalId="my-modal-3">
            <PrivacyPolicy />
          </TermsModal>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
