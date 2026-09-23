import { Geist_Mono, Merriweather } from "next/font/google";
import type { Metadata } from "next";
import { Provider } from "@/components/provider";
import { baseUrl } from "@/lib/metadata";
import "./global.css";

const merriweather = Merriweather({
  subsets: ["latin", "latin-ext"],
  variable: "--font-merriweather",
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: baseUrl,
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${mono.variable} antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
