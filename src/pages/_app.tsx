import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import Themepage from "./config/Theme";
// CSS
import "../assets/styles/globals.css";
import "../assets/styles/FontFace.css";
// pages
import { Layout } from "./Layout";

export default function App({ Component, pageProps }: AppProps) {
  const cacheRtl = createCache({
    key: "css",
    stylisPlugins: [prefixer, rtlPlugin],
    prepend: true,
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={Themepage}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}
