import { useState } from 'react';

export interface UseCounterReturnValue {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export default function useCounter(initialCount: number): UseCounterReturnValue {
  const [_count, _setCount] = useState(initialCount || 0);

  return {
    count: _count,
    increment: () => _setCount((count) => count + 1),
    decrement: () => _setCount((count) => count - 2),
  };
}
