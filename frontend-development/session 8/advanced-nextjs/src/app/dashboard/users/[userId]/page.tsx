export function generateMetadata({ params }: { params: { userId: string } }) {
  const { userId } = params;

  return {
    title: `Dashboard - User ${userId} data`
  }
}

interface Props {
  params: Promise<{
    userId: string
  }>
}

async function getUserData(userId: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/${userId}`);
  const data = await response.json();
  return data;
}

export default async function DashboardIndividualUserPage(props: Props) {
  const { userId } = await props.params;
  const data = await getUserData(userId);

  return (
    <div>
      <h1>User {userId} data:</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
