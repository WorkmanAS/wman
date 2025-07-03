import "../src/styles/index.css";
import "yet-another-react-lightbox/styles.css";
import type { AppProps } from "next/app";
import createEmotionCache from "../src/config/createEmotionCache";
import { EmotionCache } from "@emotion/utils";
import Router, { useRouter } from "next/router";
import * as React from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../src/styles/theme";
import { NextPage } from "next";
import Script from "next/script";

const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  React.useEffect(() => {
    Router.events.on("routeChangeComplete", () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }, []);

    let getLayout = (Component as any).getLayout || ((page: any) => page);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-STJ6HK83M3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
       
         gtag('config', 'G-STJ6HK83M3');
        `}
      </Script>

      <Script
        src="//stats.docu.info/docu-snippet.js"
        data-site-id="8"
        data-domain-id="789"
        strategy="afterInteractive"
      />

      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
