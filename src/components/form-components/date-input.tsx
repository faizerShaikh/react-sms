import { cn, getValueByKey } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { HelpText } from './help-text';

function DateInput({
  name,
  helpText,
  className,
  label,
  required = false,
  placeholder = 'Pick a date',
  minDate,
  maxDate,
  disable,
  isReadOnly = false,
}: {
  name: string;
  helpText?: string;
  className?: string;
  label: string;
  required?: boolean;
  disable?: boolean;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  isReadOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const {
    setValue,
    formState: { errors },
    watch,
    register,
  } = useFormContext(); // Access the react-hook-form context
  const error = getValueByKey(errors, name) as FieldError | undefined;
  const date = watch(name);

  const { disabled, ref } = register(name);

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
          {date ? format(date, 'PP') : '-'}
        </p>
      </div>
    );
  }
  return (
    <div className={`group relative mt-4 ${className}`} ref={ref}>
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
        onOpenChange={(val) => {
          setOpen(val);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            disabled={disabled || disable}
            className={cn(
              'w-full justify-start gap-3 bg-white border-input border rounded-sm focus:border-primary font-normal truncate text-active text-sm md:text-lg hover:bg-white my-0 px-4 py-[17px] h-[52px]',
              !date && 'text-muted-foreground',
              {
                'bg-gray-50': disabled || disable,
                'border-primary': open,
              },
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? (
              format(date, 'PP')
            ) : (
              <span className='text-gray-300'>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            selected={date}
            required={required}
            onSelect={(value: Date | undefined) => {
              setValue(name, value, { shouldValidate: true });
              setOpen(false);
            }}
            initialFocus
            captionLayout='dropdown-years'
            toDate={maxDate}
            fromDate={minDate || new Date(1950, 1)}
          />
        </PopoverContent>
      </Popover>
      <div>
        {(error || helpText) && (
          <HelpText error={!!error}>
            {error ? error?.message : helpText}
          </HelpText>
        )}
      </div>
    </div>
  );
}

export { DateInput };
