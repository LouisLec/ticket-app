import "../styles/globals.css";
import localFont from "@next/font/local";
import { Inter, Cormorant } from "@next/font/google";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const localFontSans = localFont({
  src: [
    {
      path: "../public/fonts/CalSans-SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cal-sans",
});

const RootLayout = ({ children }) => {
  return (
    <html
      lang="fr"
      className={
        " font-sans text-slate-900 antialiased h-full bg-slate-100 caret-teal-500 selection:text-teal-500 selection:bg-slate-800 " +
        fontSans.variable +
        " " +
        localFontSans.variable
      }
    >
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
};

export default RootLayout;
