import { ReactNode } from 'react';
import Image from 'next/image';

interface Props {
  children: ReactNode;
  isLast?: boolean;
}

export default function TodoList(props: Props) {
  const { children, isLast = false } = props;

  return (
    <div
      className="py-5 px-6 dark:!border-[#393A4B]"
      style={!isLast ? { borderBottom: '1px solid #E3E4F1' } : {}}
    >
      <div className="flex items-center gap-6">
        <div className="w-6 h-6 rounded-[50%] border border-solid border-[#C058F3]"></div>
        <div>{children}</div>
        <Image
          width={18}
          height={18}
          src="/remove-icon.svg"
          unoptimized
          alt="remove icon"
          className="cursor-pointer ml-auto"
        />
      </div>
    </div>
  );
}
