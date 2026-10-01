const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID || "AW-10846077480";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleTag() {
  if (!GTAG_ID) return null;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
      />
      <script
        id="google-tag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GTAG_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
            ${GA_ID ? `gtag('config', '${GA_ID}', { page_path: window.location.pathname });` : ""}
          `,
        }}
      />
    </>
  );
}
