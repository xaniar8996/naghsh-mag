import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no,viewport-fit=cover"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
