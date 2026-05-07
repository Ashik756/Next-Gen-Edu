import SessionWrapper from "@/components/Common/SessionWrapper";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import ConditionalNavbar from "@/components/Common/ConditionalNavbar";
import ConditionalMain from "@/components/Common/ConditionalMain";
import ConditionalFooter from "@/components/Common/ConditionalFooter";


const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Next Gen Edu — বাংলাদেশের সেরা LMS Platform",
  description: "দেশ সেরা টিচার প্যানেল নিয়ে আমরা আছি তোমাদের সাথে। এইচএসসি, এডমিশন, স্কিলস কোর্স করো অনলাইনে।",
  keywords: "LMS, online learning, HSC, admission, Bangladesh, education",
  openGraph: {
    title: "Next Gen Edu — বাংলাদেশের সেরা LMS Platform",
    description: "দেশ সেরা টিচার প্যানেল নিয়ে আমরা আছি তোমাদের সাথে।",
    url: "https://nextgenedu-pi.vercel.app",
    siteName: "Next Gen Edu",
    images: [
      {
        url: "https://nextgenedu-pi.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Gen Edu",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Gen Edu — বাংলাদেশের সেরা LMS Platform",
    description: "দেশ সেরা টিচার প্যানেল নিয়ে আমরা আছি তোমাদের সাথে।",
    images: ["https://nextgenedu-pi.vercel.app/og-image.png"],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0E0E0E] text-white min-h-screen flex flex-col`}>
        <SessionWrapper>
          <TooltipProvider>
            <ConditionalNavbar />
            <ConditionalMain className="flex-1 pt-16">
              {children}
            </ConditionalMain>
            <ConditionalFooter></ConditionalFooter>
          </TooltipProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}