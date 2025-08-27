import { Button, MobileResponsiveDialog } from '@/components';
import { FileInput, TextareaField } from '@/components/form-components';
import { Form } from '@/components/ui/form';
import { api } from '@/configs/axios';
import { AssignmentInterface } from '@/interfaces';
import { toFormData } from '@/lib/to-form-data-helper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

type Props = {
  homeworkId: string;
  myAssignment: AssignmentInterface | null;
  refetch: () => void;
};

const schema = yup.object().shape({
  assignments: yup
    .mixed()
    .required('Assignment is required')
    .nonNullable('Assignment is required')
    .test('fileSize', 'File size must be less than 2MB', (value: any) => {
      if (!value) return true;
      if (Array.isArray(value)) {
        return value.every((file) => file.size <= 2 * 1024 * 1024);
      } else if (value instanceof File) {
        return value.size <= 2 * 1024 * 1024;
      }
      return false;
    }),
  comments: yup.string().notRequired().nullable().optional(),
});
export function SubmitAssignment({ homeworkId, myAssignment, refetch }: Props) {
  const onCloseRef = useRef<() => void>(() => {});
  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      assignments: [],
      comments: '',
    },
    disabled: !!myAssignment,
    mode: 'onChange',
  });

  const { mutate: submitAssignment, isPending } = useMutation({
    mutationFn: (data: yup.InferType<typeof schema>) => {
      return api.post(
        '/app/assignment/',
        toFormData({ ...data, homework: homeworkId }),
      );
    },
    onSuccess: () => {
      toast.success('Assignment submitted successfully');
      onCloseRef.current();
      refetch();
    },
  });

  const onSubmit = (data: yup.InferType<typeof schema>) => {
    submitAssignment(data);
  };
  return (
    <MobileResponsiveDialog
      heading='Upload Homework'
      dialogContentClassName='sm:max-w-[640px]'
      onCloseRef={onCloseRef}
      trigger={
        <Button className='w-full' variant='primary-contained' size='large'>
          {myAssignment ? 'View' : 'Submit'} Assignment
        </Button>
      }
    >
      {({ onClose }) => (
        <div className='mt-5 tb:p-0 p-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-4'>
                <FileInput
                  disabled={!!myAssignment}
                  label='Assignments'
                  isRequired={true}
                  name='assignments'
                  accept='*'
                  multiple={true}
                  helpText='Upload your assignment here, you can upload multiple assignments'
                />
                <TextareaField
                  label='Comments'
                  name='comments'
                  placeholder='Enter comments (optional)'
                  rows={3}
                />
              </div>
              <div className='flex justify-end items-center gap-5 border-t border-gray-200 pt-4 mt-5 tb:flex-row flex-col-reverse'>
                <Button
                  size='large'
                  className='tb:w-auto'
                  variant='primary-outlined'
                  onClick={onClose}
                  type='button'
                >
                  Close
                </Button>
                {!myAssignment && (
                  <Button
                    type='submit'
                    size='large'
                    className='tb:w-auto'
                    variant='primary-contained'
                    disabled={isPending}
                  >
                    {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      )}
    </MobileResponsiveDialog>
  );
}
