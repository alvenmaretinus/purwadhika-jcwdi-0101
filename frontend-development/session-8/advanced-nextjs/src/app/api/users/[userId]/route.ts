type Params = {
  params: {
    userId: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  const { userId } = params;

  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }

  const data = await response.json();

  return Response.json(data);
}
