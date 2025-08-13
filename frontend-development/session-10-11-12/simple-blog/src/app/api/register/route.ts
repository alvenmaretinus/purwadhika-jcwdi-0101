import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const response = await fetch(
    `https://api.backendless.com/E5E1E795-6B74-4652-9D0D-98C93CEC36E6/F71449B8-0E2C-4219-BAD9-6CFA68E3CEEF/users/register`,
    {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }

  const data = await response.json();

  return Response.json(
    {
      name: data.name,
      email: data.email,
    },
    { status: 200 }
  );
}
