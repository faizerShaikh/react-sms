'use client';
import { cn, getValueByKey } from '@/lib/utils';
import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { HelpText } from './help-text';

interface textareaProps {
  name: string;
  rows: number;
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  helpText?: string;
  isReadOnly?: boolean;
}

export const TextareaField: React.FC<textareaProps> = ({
  name,
  label,
  placeholder,
  disabled = false,
  required = false,
  className,
  helpText,
  rows = 3,
  isReadOnly = false,
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext(); // Access the react-hook-form context

  const error = getValueByKey(errors, name) as FieldError | undefined;

  if (isReadOnly) {
    return (
      <div
        className={cn(
          'sm:border-l border-l-zinc-100 sm:pl-6 min-h-12',
          className,
        )}
      >
        <label className='text-sm font-semibold text-zinc-700 whitespace-nowrap'>
          {label}
        </label>
        <p className='text-sm text-zinc-500 font-medium'>
          {watch(name) || '-'}
        </p>
      </div>
    );
  }

  return (
    <div className={`group relative mt-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className='absolute start-3 top-0 z-10 block -translate-y-1/2 bg-background px-1 text-sm leading-5 font-normal text-helper max-md:uppercase max-md:font-metropolis max-md:text-xs'
        >
          {label}
          {required && <span className='text-destructive'>*</span>}
        </label>
      )}
      <div
      // className={cn('focus-within:p-[1px] rounded-sm', {
      //   'bg-primary': !error,
      // })}
      >
        <Textarea
          autoFocus={false}
          rows={rows}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={getValueByKey(getValues(), name)}
          {...register(name, { required })}
          className={`border border-gray-200 shadow-none md:!text-lg block !w-full focus:!border-primary text-active !bg-background placeholder:text-gray-300 rounded-sm px-4 py-[17px] focus-visible:ring-0 border-solid focus:outline-none ${
            error ? 'border-destructive' : ''
          }`}
        />
      </div>
      {(error || helpText) && (
        <HelpText error={!!error}>{error ? error?.message : helpText}</HelpText>
      )}
    </div>
  );
};
