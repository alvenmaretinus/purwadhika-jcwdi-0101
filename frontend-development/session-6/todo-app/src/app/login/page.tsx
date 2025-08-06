'use client';

import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateEmail } from '@/reducers/userReducer';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const userEmail = useSelector<{ user: { email: string } }>((state) => state.user.email);

  useEffect(() => {
    if (userEmail) {
      redirect('/');
    }
  }, [userEmail]);

  return (
    <div>
      email:{' '}
      <input
        type="email"
        className="border border-solid border-black"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => dispatch(updateEmail(input))}>Login</button>
    </div>
  );
}
