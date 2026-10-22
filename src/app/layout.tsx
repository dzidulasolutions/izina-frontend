import type { Metadata } from "next";
import "./globals.css";
import { googleSans, righteous } from "../lib/fonts";
import { SessionExpiredListener } from "../components/SessionExpiredListener";
import type { Viewport } from "next";
import RegisterSW from "../components/pwa/register-sw";

export const metadata: Metadata = {
    title: "Izina",
    description: "L'écho des prénoms africains",
    manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Izina",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${righteous.variable} ${googleSans.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <SessionExpiredListener />
                <RegisterSW />
                {children}

            </body>
        </html>
    );
}
