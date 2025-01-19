import { Providers } from "./providers";
import TopBar from "./components/TopBar";
import "./globals.css";
import Footer from "./components/Footer";
import { ClerkProvider, GoogleOneTap } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body>
          <Providers>
            <TopBar />
            <GoogleOneTap cancelOnTapOutside={true} />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
