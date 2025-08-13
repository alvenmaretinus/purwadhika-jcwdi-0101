import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { author, title, slug, content } = await request.json();

  const cookieStore = await cookies();
  const userToken = cookieStore.get('user-token')?.value ?? '';

  const response = await fetch(
    `https://api.backendless.com/E5E1E795-6B74-4652-9D0D-98C93CEC36E6/F71449B8-0E2C-4219-BAD9-6CFA68E3CEEF/data/articles`,
    {
      method: 'POST',
      headers: {
        'user-token': userToken,
      },
      body: JSON.stringify({
        author,
        title,
        slug,
        content,
      }),
    }
  );

  if (!response.ok) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }

  const data = await response.json();

  return Response.json(data, { status: 200 });
}

export async function PUT(request: Request) {
  const { objectId, author, title, slug, content } = await request.json();

  const cookieStore = await cookies();
  const userToken = cookieStore.get('user-token')?.value ?? '';

  const response = await fetch(
    `https://api.backendless.com/E5E1E795-6B74-4652-9D0D-98C93CEC36E6/F71449B8-0E2C-4219-BAD9-6CFA68E3CEEF/data/articles/${objectId}`,
    {
      method: 'PUT',
      headers: {
        'user-token': userToken,
      },
      body: JSON.stringify({
        author,
        title,
        slug,
        content,
      }),
    }
  );

  if (!response.ok) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }

  const data = await response.json();

  return Response.json(data, { status: 200 });
}
