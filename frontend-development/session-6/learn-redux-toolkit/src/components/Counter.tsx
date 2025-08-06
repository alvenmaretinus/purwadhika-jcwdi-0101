'use client';

import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/reducers/counterReducer';
import { useState } from 'react';

export default function Counter() {
  const count = useSelector((state: { counter: { value: number } }) => state.counter.value);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState(0);

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
      />
      <button onClick={() => dispatch(incrementByAmount(inputValue))}>incrementByCount</button>
    </div>
  );
}
