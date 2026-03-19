import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ScriptsProvider } from "@/components/ScriptsProvider/ScriptsProvider";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bigdata Widgets demo",
  description: "Several examples on how to build with widgets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${hankenGrotesk}`}>
        <Sidebar />
        <ScriptsProvider>
          <main>{children}</main>
        </ScriptsProvider>
      </body>
    </html>
  );
}
