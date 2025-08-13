import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const response = await fetch(
    `https://api.backendless.com/E5E1E795-6B74-4652-9D0D-98C93CEC36E6/F71449B8-0E2C-4219-BAD9-6CFA68E3CEEF/users/login`,
    {
      method: 'POST',
      body: JSON.stringify({
        login: email,
        password: password,
      }),
    }
  );

  if (!response.ok) {
    return Response.json({ error: 'Wrong credentials' }, { status: 500 });
  }

  const data = await response.json();

  const cookieStore = await cookies();
  cookieStore.set({
    name: 'user-token',
    value: data['user-token'],
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return Response.json(
    {
      name: data.name,
      email: data.email,
    },
    { status: 200 }
  );
}
