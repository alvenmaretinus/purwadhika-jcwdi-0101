'use client';

interface Props {
  error: {
    message: string;
  };
  reset: () => void;
}

export default function DashboardUsersErrorPage({ error, reset }: Props) {
  return (
    <div>
      <div>something went wrong, try again later...</div>
      {error.message}
      <div className="pt-5">
        <button onClick={reset} className="border border-solid border-red-300">
          Try again
        </button>
      </div>
    </div>
  );
}
