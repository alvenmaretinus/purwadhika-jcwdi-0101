export async function GET() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Users list not found' }), { status: 404 });
  }

  const data = await response.json()

  return Response.json(data);
}
