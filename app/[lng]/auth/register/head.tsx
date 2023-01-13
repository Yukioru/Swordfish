import CommonTags from '@/lib/head/CommonTags';
import LocalesTags from '@/lib/head/LocalesTags';
import { PropsWithParams } from 'types';

function Head({ params }: PropsWithParams) {
  return (
    <>
      <title>Register</title>
      <meta name="description" content="Another description" />
      <CommonTags />
      <LocalesTags lng={params.lng} url="/auth/register" />
    </>
  );
}

export default Head;
