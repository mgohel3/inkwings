import type { Metadata } from "next";
import { bricolage, instrument, caveat } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://inkwings.in"),
  title: {
    default: "InkWings Printing Solution | Printing services in Ahmedabad",
    template: "%s | InkWings Printing Solution",
  },
  description:
    "InkWings is a one-stop print media partner in Ahmedabad: corporate stationery, marketing materials, packaging and labels, signage, promotional products and apparel.",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "InkWings Printing Solution",
  image: "https://inkwings.in/logo.png",
  url: "https://inkwings.in",
  telephone: "+91 81416 40756",
  email: "inkwingsprint@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-811, Sun Westbank, Opp. Vallabh Sadan, River Front, Ashram Road",
    addressLocality: "Ahmedabad",
    postalCode: "380009",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} ${caveat.variable}`}>
      <body className="overflow-x-clip bg-paper font-body text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <div className="relative">
          <Nav />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
