'use client';

import { cn, getValueByKey } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cva } from 'class-variance-authority';
import { Check, ChevronDown, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { HelpText } from './help-text';

const selectVariants = cva(
  'w-full justify-between bg-background font-normal text-active text-sm md:text-lg hover:bg-background my-0',
  {
    variants: {
      size: {
        sm: 'px-[10px] py-[9px] [&_span]:text-sm',
        lg: 'px-4 py-[17px] h-[52px]',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

const defaultGetOptionLabel = (option: any) => option?.label;

export function SelectInput({
  options,
  name,
  placeholder,
  label,
  required,
  size = 'lg',
  className,
  helpText,
  onValueChange,
  containerId,
  getOptionLabel = defaultGetOptionLabel,
  isReadOnly = false,
  modalPopover = false,
}: {
  name: string;
  options: any[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  dataRef?: string;
  className?: string;
  containerId?: string;
  helpText?: string;
  onValueChange?: (value: any) => void;
  size?: 'sm' | 'lg';
  getOptionLabel?: (option: any) => string;
  isReadOnly?: boolean;
  modalPopover?: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const error = getValueByKey(errors, name) as FieldError | undefined;
  const value = watch(name);
  const { onBlur, disabled, ref } = register(name, { required });

  const fieldValue = useMemo(() => {
    return value ? getOptionLabel(value) : placeholder;
  }, [value, options, placeholder, getOptionLabel]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredOptions = useMemo(() => {
    return !searchTerm
      ? options
      : options.filter((option) =>
          getOptionLabel(option)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
  }, [options, searchTerm, getOptionLabel]);

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    overscan: 5,
  });

  const items = virtualizer.getVirtualItems();
  const height = virtualizer.getTotalSize();

  // Debounced measurement to prevent rapid ResizeObserver calls
  const measureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      if (measureTimeoutRef.current) {
        clearTimeout(measureTimeoutRef.current);
      }
      measureTimeoutRef.current = setTimeout(() => {
        virtualizer.measure();
      }, 100);
    }
    return () => {
      if (measureTimeoutRef.current) {
        clearTimeout(measureTimeoutRef.current);
      }
    };
  }, [open, virtualizer]);

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
          {getOptionLabel(value) || '-'}
        </p>
      </div>
    );
  }

  return (
    <div className={cn('relative', { 'mt-4': !!label }, className)} ref={ref}>
      {label && (
        <label
          htmlFor={name}
          className='absolute start-3 top-0 z-10 block -translate-y-1/2 bg-background px-1 text-sm leading-5 font-normal text-helper max-md:uppercase max-md:font-metropolis max-md:text-xs'
        >
          {label}
          {required && <span className='text-destructive'>*</span>}
        </label>
      )}
      <Popover
        open={open}
        modal={modalPopover}
        onOpenChange={(val) => {
          setOpen(val);

          if (!val) {
            onBlur({ target: { name, value }, type: 'blur' });
          }
        }}
      >
        <div
          className={cn('rounded-sm', {
            'bg-tertiary-gradient p-[1px]': open,
          })}
        >
          <PopoverTrigger asChild>
            <Button
              id={name}
              variant='outline'
              role='combobox'
              aria-expanded={open}
              name={name}
              className={cn(
                'rounded-sm relative max-md:gap-1',
                selectVariants({ size }),
                {
                  'border-destructive': error,
                },
              )}
              disabled={disabled}
            >
              <span className={cn('truncate', !value && 'text-gray-300')}>
                {fieldValue}
              </span>

              <span className='inline-flex items-center gap-1 md:gap-1.5'>
                {value && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setValue(name, null, { shouldValidate: true });
                      onValueChange && onValueChange(null);
                    }}
                    className='rounded-sm p-0 text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer'
                    // className='absolute right-10 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  >
                    <X className='h-3 w-3' />
                  </div>
                )}
                <ChevronDown
                  size={16}
                  strokeWidth={2}
                  className='shrink-0 text-muted-foreground/80'
                  aria-hidden='true'
                />
              </span>
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent
          containerId={containerId}
          className='w-full min-w-[var(--radix-popper-anchor-width)] p-0 z-[401]'
          align='start'
        >
          {options.length > 10 && (
            <input
              className='w-full rounded-t-md bg-background z-10 outline-none ring-0 border-b border-zinc-200 px-3 py-2 shadow-none text-zinc-600'
              placeholder='Search...'
              onChangeCapture={(e: any) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
            />
          )}
          <div
            style={{
              contain: 'strict',
              height: height > 300 ? 300 : height + 10,
              width: '100%',
              overflowY: 'auto',
            }}
            ref={parentRef}
          >
            <div
              style={{
                height: virtualizer.getTotalSize(),
                width: '100%',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${items[0]?.start ?? 0}px)`,
                }}
                className='p-1 z-[9]'
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  let option = filteredOptions[virtualRow.index];
                  const label = getOptionLabel(option);

                  return (
                    <div
                      onClick={() => {
                        setValue(name, option, { shouldValidate: true });
                        onValueChange && onValueChange(option);
                        setOpen(false);
                      }}
                      className='cursor-pointer'
                      key={virtualRow.key}
                      data-index={virtualRow.index}
                      ref={virtualizer.measureElement}
                    >
                      <div
                        className={
                          'relative flex select-none items-center justify-between  text-zinc-500 font-medium rounded-sm px-2 py-1.5 text-sm text cursor-pointer hover:bg-gray-100'
                        }
                      >
                        <div>{label}</div>
                        <Check
                          className={cn(
                            'ml-auto',
                            JSON.stringify(value) === JSON.stringify(option)
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {(error || helpText) && (
        <HelpText error={!!error}>{error ? error?.message : helpText}</HelpText>
      )}
    </div>
  );
}
