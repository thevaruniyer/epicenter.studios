import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Epicenter Studios, Built to be seen",
  description:
    "Epicenter Studios is design that has a point of view. Identities that hold, decks that make people lean in. Anything but forgettable.",
  openGraph: {
    title: "Epicenter Studios",
    description: "Design with a point of view. Anything but forgettable.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Real Satoshi — free for commercial use, served from Fontshare's CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
        {/* Fraunces — expressive old-style serif italic, used for the manifesto copy */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
