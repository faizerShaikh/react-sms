import { Button, MobileHeader } from '@/components';
import {
  DocumentAttached,
  documentAttachedDefaultValues,
  documentAttachedSchema,
  getDocumentAttachedDefaultValues,
  getDocumentAttachedValuesToSubmit,
} from '@/components/admission';
import { FullPageLoader } from '@/components/full-page-loader';
import { Form } from '@/components/ui/form';
import { api } from '@/configs/axios';
import { useAuth } from '@/context/auth-context';
import { AdmissionInterface } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type Props = {};

export function UploadDocument({}: Props) {
  const {
    state: { userData },
    setDocumentAdded,
  } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: documentAttachedDefaultValues,
    resolver: yupResolver(documentAttachedSchema) as any,
  });

  const { data, isLoading } = useQuery<AdmissionInterface>({
    queryKey: ['admission', userData?.admission_id],
    queryFn: () => {
      return api
        .get(`/admission/`, {
          params: {
            adm: userData?.admission_id,
            sp: 4,
          },
        })
        .then((res) => res.data);
    },
    enabled: !!userData?.admission_id,
  });

  useEffect(() => {
    if (data) {
      const formData: any = getDocumentAttachedDefaultValues(data);
      form.reset(formData);
    }
  }, [data]);

  const {
    mutate: mutateDocumentAttached,
    isPending: isPendingDocumentAttached,
  } = useMutation({
    mutationFn: (data: any) => {
      return api
        .post('/admission-documents-upload/', data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      setDocumentAdded();
      navigate('/student/home');
      toast.success('Documents saved successfully');
    },
  });

  const onSubmit = (data: any) => {
    const submitValues: any = getDocumentAttachedValuesToSubmit(data);

    submitValues.append('admission', userData?.admission_id || '');
    submitValues.append('student', userData?.student_id || '');
    submitValues.append('step', '4');
    submitValues.append('is_update', data.is_update);
    mutateDocumentAttached(submitValues);
  };

  return (
    <div>
      {isLoading && <FullPageLoader />}
      <MobileHeader>Upload Document</MobileHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='mt-5'>
          <DocumentAttached />
          <Button
            variant='primary-contained'
            size={'large'}
            className='w-full mt-5'
            type='submit'
            disabled={isPendingDocumentAttached}
          >
            {isPendingDocumentAttached && <Loader2 className='animate-spin' />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
