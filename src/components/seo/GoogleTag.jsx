import Script from "next/script";

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID || "AW-10846077480";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleTag() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GTAG_ID}');
          ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
        `}
      </Script>
    </>
  );
}
