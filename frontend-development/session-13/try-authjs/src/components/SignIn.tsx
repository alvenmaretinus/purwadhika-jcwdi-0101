'use client';

// FE signin - calling signIn api from next-auth
import { signIn } from 'next-auth/react';
// BE signin - calling signIn function from auth.ts
// import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const [error, setError] = useState('');

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn(
      // credentials - "Credentials - auth.ts" provider type in string format
      'credentials',
      {
        // dont redirect when sign in is invalid - when null in returned
        redirect: false,
        // params
        email,
        password,
      }
    );

    if (result?.error) {
      // if using formik, set the error in formik state
      setError('Invalid email or password');
    } else {
      // redirection logic after successful sign-in
      redirect('/dashboard');
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
