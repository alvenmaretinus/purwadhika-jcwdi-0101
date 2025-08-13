import moment from 'moment';
import Article from '@/models/Article';
import Image from 'next/image';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return {
    title: `Article - Simple Blog`,
  };
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getArticleData(slug: string): Promise<Article> {
  const whereClause = encodeURIComponent(`slug='${slug}'`);
  const response = await fetch(
    `https://api.backendless.com/E5E1E795-6B74-4652-9D0D-98C93CEC36E6/F71449B8-0E2C-4219-BAD9-6CFA68E3CEEF/data/articles?where=${whereClause}`
  );
  const data = await response.json();
  return data[0];
}

export default async function ArticlePage(props: Props) {
  const { slug } = await props.params;
  const data = await getArticleData(slug);

  return (
    <div className="bg-white dark:bg-gray-900">
      <Link href="/" className='block mb-10'>{`< back to all articles`}</Link>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            {data.title}
          </h2>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 dark:border-gray-700">
            <article className="flex max-w-xl flex-col items-start justify-between">
              <div className="relative mb-8 flex items-center gap-x-4">
                <Image
                  src="/profile.jpg"
                  width={500}
                  height={500}
                  alt="Picture of author"
                  className="size-10 rounded-full bg-gray-50 dark:bg-gray-800"
                />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900 dark:text-white">{data.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={data.created.toString()} className="text-gray-300">
                  {moment(data.created).format('D MMMM YYYY, h:mm A')}
                </time>
              </div>
              <div className="group relative">
                <p className="mt-5 text-sm/6 text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {data.content}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
