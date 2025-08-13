import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { PencilIcon } from '@heroicons/react/24/outline';

interface Props {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: number;
  canEdit?: boolean
}

export default function ArticleCard(props: Props) {
  const { slug, title, description, author, publishedAt, canEdit } = props;

  return (
    <article className="flex max-w-xl flex-col items-start justify-between bg-gray-900 border border-gray-800 p-4 rounded-xl">
      <div className="flex items-center gap-x-4 text-xs w-full">
        <time dateTime={publishedAt.toString()} className="text-gray-300">
          {moment(publishedAt).format('D MMMM YYYY, h:mm A')}
        </time>
        {canEdit && (
          <Link href={`/admin/update-article/${slug}`} className="text-gray-400 hover:text-gray-300 ml-auto">
            <PencilIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="group relative grow">
        <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-300 line-clamp-2">
          <Link href={`/articles/${slug}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-300">{description}</p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
        <Image
          src="/profile.jpg"
          width={500}
          height={500}
          alt="Picture of author"
          className="size-10 rounded-full bg-gray-50"
        />
        <div className="text-sm/6">
          <p className="font-semibold text-white">
            <span className="absolute inset-0" />
            {author}
          </p>
        </div>
      </div>
    </article>
  );
}
