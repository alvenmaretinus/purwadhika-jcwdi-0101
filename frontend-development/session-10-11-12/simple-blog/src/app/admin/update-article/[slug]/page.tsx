'use client';

import Article from '@/models/Article';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { useParams } from 'next/navigation';

// Yup validation schema
const ArticleSchema = Yup.object({
  author: Yup.string()
    .min(2, 'Author name should be at least 2 characters')
    .required('Author is required'),
  title: Yup.string().min(3, 'Title should be at least 3 characters').required('Title is required'),
  slug: Yup.string()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be URL-friendly (lowercase, numbers, hyphens)'
    )
    .required('Slug is required'),
  content: Yup.string()
    .min(10, 'Content should be at least 10 characters')
    .required('Content is required'),
});

export default function UpdateArticlePage() {
  const formik = useFormik({
    initialValues: {
      objectId: '',
      author: '',
      title: '',
      slug: '',
      content: '',
    },
    validationSchema: ArticleSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('Article submitted:', values);

      try {
        const response = await fetch('/api/admin/articles', {
          method: 'PUT',
          body: JSON.stringify({
            objectId: values.objectId,
            author: values.author,
            title: values.title,
            slug: values.slug,
            content: values.content,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Article "${values.title}" updated!`);
          resetForm();
          window.location.href = '/';
        } else {
          alert(data.error);
        }
      } catch {
        alert(`Something went wrong during article update.`);
      }

      setSubmitting(false);
    },
  });

  const { slug } = useParams();

  useEffect(() => {
    getArticleDataAndSetFormikForm();
  }, []);

  async function getArticleDataAndSetFormikForm() {
    const whereClause = encodeURIComponent(`slug='${slug}'`);
    const response = await fetch(
      `https://api.backendless.com/E5E1E795-6B74-4652-9D0D-98C93CEC36E6/F71449B8-0E2C-4219-BAD9-6CFA68E3CEEF/data/articles?where=${whereClause}`
    );
    const data = await response.json();

    const oldData = data[0];

    formik.setValues({
      objectId: oldData.objectId,
      author: oldData.author,
      title: oldData.title,
      slug: oldData.slug,
      content: oldData.content,
    });
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-12">
        {/* Section 1 */}
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
          <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Update article
          </h1>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
            Update article details below.
          </p>

          {/* Author */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="author"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Author
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                  <input
                    id="author"
                    name="author"
                    type="text"
                    placeholder="Author name here"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.author}
                    className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                    disabled={!!formik.values.author}
                  />
                </div>
                {formik.touched.author && formik.errors.author && (
                  <p className="mt-1 text-sm text-red-400">{formik.errors.author}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Title */}
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Article title here"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="mt-1 text-sm text-red-400">{formik.errors.title}</p>
                )}
              </div>
            </div>

            {/* Slug */}
            <div className="sm:col-span-4">
              <label
                htmlFor="slug"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Slug
              </label>
              <div className="mt-2">
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  placeholder="Article url slug here"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.slug}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
                {formik.touched.slug && formik.errors.slug && (
                  <p className="mt-1 text-sm text-red-400">{formik.errors.slug}</p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="col-span-full">
              <label
                htmlFor="content"
                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
              >
                Content
              </label>
              <div className="mt-2">
                <textarea
                  id="content"
                  name="content"
                  rows={3}
                  placeholder="Write your article here..."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.content}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                />
              </div>
              {formik.touched.content && formik.errors.content && (
                <p className="mt-1 text-sm text-red-400">{formik.errors.content}</p>
              )}
              <p className="mt-3 text-sm/6 text-gray-600 dark:text-gray-400">
                Article content goes here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 dark:bg-indigo-500 dark:shadow-none dark:focus-visible:outline-indigo-500"
        >
          {formik.isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
}
