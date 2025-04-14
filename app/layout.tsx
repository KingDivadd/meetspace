import type { Metadata } from "next";
import "./globals.css";
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/sonner"
import '@stream-io/video-react-sdk/dist/css/styles.css'



export const metadata: Metadata = {
  title: "meetspace",
  description: "World best video confrencing app",
  icons: {
    icon: '/icons/zoom-icon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={` antialiased w-screen h-screen`}>
          <main>{children}</main>
          <Toaster position="top-right"/>
        </body>
      </html>
    </ClerkProvider>
  );
}
