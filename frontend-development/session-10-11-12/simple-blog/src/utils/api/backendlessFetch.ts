import { redirect } from 'next/navigation';

export default async function backendlessFetch(path: string, options: RequestInit = {}) {
  try {
    const response = await fetch(path, {
      ...options,
    });

    if (response.status === 401) {
      // SSR
      if (typeof window === 'undefined') {
        redirect('/login');
      }
      // CSR
      else {
        window.location.href = '/login';
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
