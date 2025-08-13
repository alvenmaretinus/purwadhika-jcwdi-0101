import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const userToken = cookieStore.get('user-token')?.value ?? '';

  const response = await fetch(
    `https://api.backendless.com/E5E1E795-6B74-4652-9D0D-98C93CEC36E6/F71449B8-0E2C-4219-BAD9-6CFA68E3CEEF/users/logout`,
    {
      method: 'GET',
      headers: {
        'user-token': userToken,
      },
    }
  );

  if (!response.ok) {
    return Response.json({ error: 'Logout failed' }, { status: 500 });
  }

  cookieStore.delete('user-token');

  redirect('/login');
}
