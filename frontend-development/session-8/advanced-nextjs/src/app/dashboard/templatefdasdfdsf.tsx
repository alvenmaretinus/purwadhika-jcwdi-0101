'use client';

import { ReactNode, useState } from 'react';

export default function DashboardTemplate({ children }: Readonly<{ children: ReactNode }>) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>template.tsx will be rerendered every page load (count = {count})</div>
      <button
        className="border border-solid border-white mr-2 p-2"
        onClick={() => setCount((count) => count + 1)}
      >
        +
      </button>
      <button
        className="border border-solid border-white p-2"
        onClick={() => setCount((count) => count - 1)}
      >
        -
      </button>
      <div className="pb-4" />
      <hr />
      <div className="pt-4">{children}</div>
    </div>
  );
}
