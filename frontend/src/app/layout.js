import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "CodeViz",
  description: "Interactive algorithm visualization with AI-powered analysis. Explore algorithms through beautiful step-by-step animations and understand how code works.",
  keywords: ["algorithm", "visualization", "AI", "code", "programming", "learning"],
  authors: [{ name: "CodeViz Team" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
