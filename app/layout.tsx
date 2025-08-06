import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  display: 'swap',
  subsets: ["latin"],
  weight: ['500', '600', '700']
});

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Discover your local coffee shop",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☕</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.className} min-h-screen flex flex-col`}>
        {/* Main content area */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Responsive footer */}
        <footer className="mt-auto bg-violet-900 py-4 sm:py-6 lg:py-8 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm sm:text-base lg:text-lg font-medium">
                By Priya Raja
              </p>
              {/* Optional: Add more footer content for larger screens */}
              <div className="hidden sm:block mt-2">
                <p className="text-xs sm:text-sm text-violet-200">
                  Discover your local coffee shops
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}