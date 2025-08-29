'use client';
import { cn, getValueByKey } from '@/lib/utils';
import React, { useState } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import { HelpText } from './help-text';

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  dataRef?: string;
  helpText?: string;
  accept?: string;
  size?: 'sm' | 'lg';
  isReadOnly?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  inputClassName?: string;
  rightIcon?: string;
}

export const InputField: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  disabled = false,
  required = false,
  className,
  dataRef,
  helpText,
  accept,
  size = 'lg',
  isReadOnly = false,
  min,
  max,
  maxLength,
  inputClassName,
  rightIcon,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext(); // Access the react-hook-form context
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const error = getValueByKey(errors, name) as FieldError | undefined;

  let regData: any = register(name, {
    required,
    valueAsNumber: type === 'string',
  });

  if (isReadOnly) {
    return (
      <div className={cn('min-h-12', className)}>
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
    <div
      ref={regData.ref}
      className={cn(`group relative mt-4`, className)}
      data-ref={`${dataRef}.container`}
    >
      {label && (
        <label
          data-ref={`${dataRef}.label`}
          htmlFor={name}
          className='absolute start-3 top-0 z-10 block -translate-y-1/2 bg-background px-1 text-sm leading-5 font-normal text-helper max-md:uppercase max-md:font-metropolis max-md:text-xs'
        >
          {label}
          {required && <span className='text-destructive'>*</span>}
        </label>
      )}
      <div
      // className={cn('focus-within:p-[1px] rounded-sm', {
      //   'bg-primary': !error || !disabled,
      // })}
      >
        <Input
          autoComplete='false'
          id={name}
          type={
            type === 'password'
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : type
          }
          placeholder={placeholder}
          min={min}
          max={max}
          data-ref={`${dataRef}.input`}
          disabled={disabled}
          accept={accept}
          defaultValue={watch(name)}
          maxLength={maxLength}
          {...{ ...regData, ref: undefined }}
          className={cn(
            `border md:!text-lg !h-[52px] block !w-full focus:border-primary text-active bg-background placeholder:text-gray-300 rounded-sm px-4 py-[17px] focus-visible:ring-0 border-solid focus:outline-none !leading-3 ${
              error ? 'border-destructive' : ''
            }`,
            {
              'px-[10px] py-[9px] !text-sm !h-[38px]': size === 'sm',
            },
            inputClassName,
          )}
        />
        <div className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer'>
          <i className={cn('ph text-lg', rightIcon)}></i>
        </div>
        {type === 'password' && (
          <>
            <i
              className={cn(
                'ph text-lg absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer',
                {
                  'ph-eye-slash': isPasswordVisible,
                  'ph-eye': !isPasswordVisible,
                },
              )}
              style={{ opacity: disabled ? 0.38 : 1 }}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            ></i>
          </>
        )}
      </div>
      {(error || helpText) && (
        <HelpText dataRef={`${dataRef}`} error={!!error}>
          {error ? error?.message : helpText}
        </HelpText>
      )}
    </div>
  );
};
