'use client';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { DashedInputWrapper } from './dashed-input-wrapper';

function RadioInput({
  options,
  name,
  label,
  required,
  className,
  helpText,
  orientation = 'horizontal',
  onValueChange,
  isReadOnly = false,
}: {
  name: string;
  options: { value: any; label: string }[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  helpText?: string;
  orientation?: 'horizontal' | 'vertical';
  onValueChange?: (val: boolean) => void;
  isReadOnly?: boolean;
}) {
  const { setValue, watch, register } = useFormContext(); // Access the react-hook-form context

  // Handle value change
  const handleChange = (value: any) => {
    // Convert string back to boolean if the original value was boolean
    let processedValue = value;
    if (typeof value === 'string' && (value === 'true' || value === 'false')) {
      processedValue = value === 'true';
    }

    setValue(name, processedValue, { shouldValidate: true }); // Update form value manually
    onValueChange && onValueChange(processedValue);
  };

  const value = watch(name);

  // Convert boolean to string for radio input compatibility
  const radioValue = typeof value === 'boolean' ? value.toString() : value;

  const { disabled } = register(name);
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
          {options.find((option) => option.value === value)?.label || '-'}
        </p>
      </div>
    );
  }

  return (
    <DashedInputWrapper
      helpText={helpText}
      label={label}
      required={required}
      name={name}
      containerClass={cn(className, 'mt-4')}
      className='p-4 rounded-sm'
      isReadOnly={isReadOnly}
    >
      {() => (
        <RadioGroup
          // style={{ "--primary": "238.7 83.5% 66.7%", "--ring": "238.7 83.5% 66.7%" } as React.CSSProperties}
          className={cn(
            `${
              orientation === 'horizontal'
                ? 'flex items-center flex-wrap gap-5'
                : ''
            }`,
          )}
          value={radioValue} // Use converted string value
          onValueChange={handleChange}
          disabled={disabled}
        >
          {options?.map((option) => (
            <div
              className='flex items-center gap-2'
              key={'radio' + name + option?.value}
            >
              <RadioGroupItem
                value={
                  typeof option?.value === 'boolean'
                    ? option?.value.toString()
                    : option?.value
                }
                checked={option?.value === value}
                id={`radio-${option?.value}`}
              />
              <Label
                className={cn(
                  disabled ? 'cursor-default' : 'cursor-pointer',
                  'font-normal',
                )}
                htmlFor={`radio-${option?.value}`}
              >
                {option?.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </DashedInputWrapper>
  );
}

export { RadioInput };
export default RadioInput;
