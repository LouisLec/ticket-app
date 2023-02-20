import "@/styles/globals.css";
import localFont from "@next/font/local";
import { Inter, Cormorant } from "@next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/utils/classes";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const localFontSans = localFont({
  src: [
    {
      path: "../../public/fonts/CalSans-SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cal-sans",
});
type Props = {
  children: ReactNode;
  params: { locale: string };
};

const RootLayout = async ({ children, params }: Props) => {
  const locale = useLocale();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(fontSans.variable, localFontSans.variable, "h-full")}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Napol.io</title>
        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* title and description */}
        <meta
          name="description"
          content="Gestion de projet en mode campagne Napoléonienne"
        />
        <meta name="og:title" content="Napol.io" />
        <meta
          name="og:description"
          content="Gestion de projet en mode campagne Napoléonienne"
        />
        <meta name="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://napol.io" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Napol.io" />
        <meta
          name="twitter:description"
          content="Gestion de projet en mode campagne Napoléonienne"
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:site" content="@LecsLouis" />
      </head>
      <body
        className={cn(
          "h-full bg-slate-50 font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-full">
            {/* header */}
            <div className="h-full">{children}</div>
            {/* footer */}
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
