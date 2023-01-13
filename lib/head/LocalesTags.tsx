const { NEXT_PUBLIC_APP_URL } = process.env;

function LocalesTags({ lng, url = '' }: { lng: string; url?: string }) {
  const postfix = lng === 'ru' ? '' : `/${lng}`;
  return (
    <>
      <link rel="canonical" href={`${NEXT_PUBLIC_APP_URL}${postfix}${url}`} />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${NEXT_PUBLIC_APP_URL}${url}`}
      />
      <link
        rel="alternate"
        hrefLang="en"
        href={`${NEXT_PUBLIC_APP_URL}/en${url}`}
      />
    </>
  );
}

export default LocalesTags;
