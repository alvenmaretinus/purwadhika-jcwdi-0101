'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

// Validation schema
const RegisterSchema = Yup.object({
  name: Yup.string().min(2, 'Name should be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
});

export default function RegisterPage() {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log('Register form submitted:', values);

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(`Registered: ${values.name} (${values.email})`);
          resetForm();
          window.location.href = '/login';
        } else {
          alert(data.error);
        }
      } catch {
        alert(`Something went wrong during registration.`);
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/blog.png" width={100} height={100} alt="Blog Logo" className="mx-auto" />
        <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-white">
          Create a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-100">
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-400">{formik.errors.name}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-100">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-red-400">{formik.errors.password}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50"
            >
              {formik.isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
