import ContentPage from '@/components/ContentPage/ContentPage';
import { getDictionary } from '@/dictionaries';
import formatMetadata from '@/lib/format-metadata';
import getStrapiData from '@/lib/get-strapi-data';
import { SupportedLanguage } from '@/models/locale';
import { ApiSportSport } from '@/types/contentTypes';
import { Metadata } from 'next';
import { headers } from 'next/headers';

const url =
  '/api/sport?populate[0]=Content.banner&populate[1]=Seo.twitter.twitterImage&populate[2]=Seo.openGraph.openGraphImage&populate[3]=ContactBanner';
const tags = ['sport'];

interface SportsProps {
  params: { lang: SupportedLanguage };
}

export default async function Organization({ params }: SportsProps) {
  const dictionary = await getDictionary(params.lang);

  const organizationData = await getStrapiData<ApiSportSport>(
    params.lang,
    url,
    tags,
  );

  return (
    <ContentPage
      contentData={organizationData.data}
      dictionary={dictionary}
      lang={params.lang}
    />
  );
}

export async function generateMetadata({
  params,
}: SportsProps): Promise<Metadata> {
  const data = await getStrapiData<ApiSportSport>(params.lang, url, tags);

  const pathname = headers().get('x-pathname') as string;

  return formatMetadata(data, pathname);
}