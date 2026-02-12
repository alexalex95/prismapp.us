import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import { ActiveProfileProvider } from "@/lib/active-profile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Added bold weights for headers
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hookup",
  description: "Get in. Get close.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0E0F13",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${nunito.variable} antialiased font-body`}>
        <ActiveProfileProvider>
          {children}
        </ActiveProfileProvider>
      </body>
    </html>
  );
}
