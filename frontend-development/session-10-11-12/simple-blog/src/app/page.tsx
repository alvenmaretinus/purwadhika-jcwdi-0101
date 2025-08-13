'use client';

import ArticleCard from '@/components/ArticleCard';
import Article from '@/models/Article';
import { debounce } from '@/utils/timing';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    document.title = 'Articles - Simple Blog';
  }, []);

  useEffect(() => {
    getArticles(searchKeyword);
  }, [searchKeyword]);

  const onKeywordSearch = debounce((event: React.KeyboardEvent<HTMLInputElement>) => {
    const searchKeyword = (event.target as HTMLInputElement).value;
    setSearchKeyword(searchKeyword);
  }, 300);

  async function getArticles(searchKeyword: string = '') {
    setIsLoading(true);

    const whereClause = encodeURIComponent(`title LIKE '%${searchKeyword}%'`);

    const response = await fetch(
      `https://api.backendless.com/E5E1E795-6B74-4652-9D0D-98C93CEC36E6/F71449B8-0E2C-4219-BAD9-6CFA68E3CEEF/data/articles?sortBy=created%20desc&where=${whereClause}`
    );
    const data = await response.json();

    setArticles(data);
    setIsLoading(false);
  }

  return (
    <div>
      <div className="flex flex-1 items-center justify-center px-2 mb-10 !border-none">
        <div className="grid w-full grid-cols-1 sm:max-w-xs">
          <input
            name="search"
            placeholder="Search articles..."
            aria-label="Search"
            className="col-start-1 row-start-1 block w-full rounded-md border-0 bg-white/5 py-1.5 pr-3 pl-10 text-white outline -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            onKeyUp={onKeywordSearch}
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400"
          />
        </div>
      </div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          {searchKeyword && (
            <div className="mb-4">
              searching for &quot;<b>{searchKeyword}</b>&quot;..
            </div>
          )}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articles.length ? (
              articles.map(({ objectId, slug, title, content, author, created }) => (
                <ArticleCard
                  key={objectId}
                  slug={slug}
                  title={title}
                  description={content}
                  author={author}
                  publishedAt={created}
                  canEdit={!!localStorage.getItem('loggedInUserName') && localStorage.getItem('loggedInUserName') === author}
                />
              ))
            ) : (
              <div>No articles found.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
