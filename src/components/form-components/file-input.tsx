import { cn, getValueByKey } from '@/lib/utils';
import { ChangeEvent, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldError, useFormContext } from 'react-hook-form';
import { DocumentViewer } from '..';
import { HelpText } from './help-text';

type Props = {
  disabled?: boolean;
  label: string;
  required?: boolean;
  name: string;
  accept?: string;
  multiple?: boolean;
  helpText?: string;
};

export function FileInput({
  disabled,
  label,
  required,
  name,
  accept,
  multiple,
  helpText,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    formState: { errors },
    watch,
    setValue,
    register,
  } = useFormContext();

  const { ref } = register(name);
  const error = getValueByKey(errors, name) as FieldError | undefined;

  const value = watch(name);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = multiple ? Array.from(files) : files[0];
    setValue(name, file, { shouldValidate: true });
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const onFileDropped = (acceptedFiles: File[]) => {
    const file = multiple ? acceptedFiles : acceptedFiles[0];
    setValue(name, file, { shouldValidate: true });
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    const files = value;
    if (!files) return;

    if (multiple) {
      const newFiles = files.filter((_: any, i: number) => i !== index);
      setValue(name, newFiles, { shouldValidate: true });
    } else {
      setValue(name, null, { shouldValidate: true });
    }
  };

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: onFileDropped,
  });

  return (
    <div className='border border-solid border-gray-200 rounded-md px-3 py-4 relative'>
      <label
        className={cn(
          'text-gray-400 text-xs font-medium absolute bg-background -top-2 left-4 transform-center px-[5px]',
          label && 'block',
          !label && 'hidden',
        )}
      >
        {label}
        {required && <span className='text-error'>*</span>}
      </label>
      {!disabled && (
        <div className='mb-3'>
          <div
            {...getRootProps()}
            className={cn(
              'w-full h-full cursor-pointer border-2 border-dashed border-primary bg-primary-light rounded-[0.25rem] p-3 flex justify-center items-center flex-col',
              !!error && 'border-error',
              !!error && 'bg-red-50',
              disabled && 'opacity-50',
              disabled && 'cursor-auto',
              isDragActive && 'bg-[#d0dbe9] border-primary',
            )}
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <input ref={ref} type='hidden' />
            <input
              ref={inputRef}
              type='file'
              hidden
              accept={accept}
              multiple={multiple}
              onChange={onChangeHandler}
              disabled={disabled}
            />
            <i
              className={cn(
                'ph-fill ph-upload-simple text-lg text-primary',
                !!error && 'text-error',
                isDragActive && 'text-primary',
              )}
            ></i>
            <p
              className={cn(
                'text-base text-primary text-center',
                !!error && 'text-error',
                isDragActive && 'text-primary',
              )}
            >
              {helpText}
            </p>
          </div>

          {(error || helpText) && (
            <HelpText dataRef={`${name}`} error={!!error}>
              {error ? error?.message : helpText}
            </HelpText>
          )}
        </div>
      )}

      <DocumentViewer
        files={value}
        className='!mb-0'
        label='Uploaded Files'
        hideDelete={disabled}
        onRemoveFile={removeFile}
      ></DocumentViewer>
    </div>
  );
}
