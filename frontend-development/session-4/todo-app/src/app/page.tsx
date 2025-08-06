'use client';

import Image from 'next/image';
import TodoList from '@/components/TodoList';
import { useState, useEffect } from 'react';

export default function Home() {
  const [uiMode, setUiMode] = useState('light');

  const renderUiModeToggler = () => {
    if (uiMode === 'light') {
      return (
        <Image
          src="/dark-mode.png"
          width={26}
          height={26}
          alt="Dark mode icon"
          className="cursor-pointer"
          onClick={() => setUiMode('dark')}
        />
      );
    }
    if (uiMode === 'dark') {
      return (
        <Image
          src="/light-mode.png"
          width={26}
          height={26}
          alt="Light mode icon"
          className="cursor-pointer"
          onClick={() => setUiMode('light')}
        />
      );
    }
  };

  useEffect(() => {
    if (uiMode === 'light') {
      document.documentElement.classList = '';
    }
    if (uiMode === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [uiMode]);

  return (
    <div className="bg-[url(/desktop-bg.png)] bg-no-repeat bg-top flex flex-col items-center h-dvh overflow-y-auto">
      <div className="w-[540px] pt-[70px]">
        <div className="flex items-center justify-between mb-10">
          <div className="font-bold text-[40px] tracking-[15px] uppercase text-white">Todo</div>
          {renderUiModeToggler()}
        </div>
        <div
          className="rounded-[5px] flex flex-col mt-[200px] bg-white dark:bg-[#25273D] dark:text-white"
          style={{ boxShadow: '0px 35px 50px -15px #C2C3D680' }}
        >
          <TodoList>Jog around the park 3x</TodoList>
          <TodoList>10 minutes meditation</TodoList>
          <TodoList>Complete Todo App on Frontend Mentor</TodoList>
          <TodoList>Pick up groceries</TodoList>
          <TodoList>Read for 1 hour</TodoList>
          <TodoList isLast>Jog around the park 3x</TodoList>
        </div>
      </div>
    </div>
  );
}
