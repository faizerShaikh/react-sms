'use client';
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { HelpText } from './help-text';

type Props = {
  children: (value: any) => React.ReactNode;
  className?: string;
  containerClass?: string;
  name: string;
  helpText?: string;
  label?: string;
  dataRef?: string;
  required?: boolean;
  isReadOnly?: boolean;
};

export const DashedInputWrapper = forwardRef<HTMLDivElement, Props>(
  (
    {
      name,
      label,
      helpText,
      className,
      containerClass,
      required,
      dataRef,
      children,
      isReadOnly = false,
    },
    ref,
  ) => {
    const { getValues, getFieldState } = useFormContext(); // Access the react-hook-form context

    const { error } = getFieldState(name);

    return (
      <div ref={ref} className={containerClass}>
        <div
          className={cn(
            'border border-gray-300 p-8 grid grid-cols-1 gap-6 relative border-dashed rounded-xl',
            {
              'border-destructive !bg-red-50': !!error,
              'p-0 bg-transparent mt-5 border-l-0 sm:border-l border-y-0 border-r-0 sm:border-solid rounded-none border-zinc-100 pl-0 sm:pl-6':
                isReadOnly,
            },
            className,
          )}
        >
          {label && (
            <label
              data-ref={`${dataRef}.label`}
              htmlFor={'body_type'}
              className={cn(
                'absolute start-3 top-0 z-10 block -translate-y-1/2 bg-inherit px-1 text-sm leading-5 font-normal text-helper max-md:uppercase max-md:font-metropolis max-md:text-xs',
                {
                  'bg-background -top-4 font-semibold text-zinc-700 start-0 sm:start-6':
                    isReadOnly,
                },
              )}
            >
              <div className='absolute top-0 left-0 h-1/2 w-full bg-background z-[-1]'></div>
              {label}
              {required && !isReadOnly && (
                <span className='text-destructive'>*</span>
              )}
            </label>
          )}

          {children(getValues()[name])}
        </div>
        {(error || helpText) && !isReadOnly && (
          <HelpText dataRef={`${dataRef}.label`} error={!!error}>
            {error ? error?.message : helpText}
          </HelpText>
        )}
      </div>
    );
  },
);

DashedInputWrapper.displayName = 'DashedInputWrapper';
