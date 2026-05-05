import SessionWrapper from "@/components/SessionWrapper";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import ConditionalMain from "@/components/ConditionalMain";
import ConditionalFooter from "@/components/ConditionalFooter";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({ subsets: ["latin"] });

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