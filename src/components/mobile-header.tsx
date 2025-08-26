import React from "react";

type Props = {
  children: React.ReactNode;
};

export function MobileHeader({ children }: Props) {
  return (
    <div className='flex justify-between relative items-center w-full'>
      <button
        className='absolute left-0 border-0 hover:bg-slate-100 bg-transparent p-2 rounded-full flex justify-center items-center cursor-pointer'
        onClick={() => window.history.back()}
      >
        <i className='ph ph-arrow-left text-2xl text-gray-300'></i>
      </button>
      <h1 className='text-heading text-base font-satoshi font-bold text-center w-full'>
        {children}
      </h1>
    </div>
  );
}
