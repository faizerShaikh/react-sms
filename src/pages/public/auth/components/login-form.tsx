import { InputField } from '@/components/form-components';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { api } from '@/configs/axios';
import { useAuth } from '@/context/auth-context';
import { StudentDataInterface, StudentLoginInterface } from '@/interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import * as yup from 'yup';

type Props = {
  userType: string;
  schema: any;
  resetForm: () => void;
  isAddMore: boolean;
};

export function LoginForm({ userType, schema, resetForm, isAddMore }: Props) {
  const { studentLoginSuccess, teacherLoginSuccess } = useAuth();
  const navigate = useNavigate();

  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      [userType == 'Student' ? 'adm_number' : 'employee_id']: '',
      password: '',
    },
    mode: 'onChange',
  });
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data: StudentLoginInterface) => {
      const response = await api.post<StudentDataInterface>(
        userType === 'Student'
          ? '/accounts/student-login/'
          : '/accounts/teacher-login/',
        data,
      );
      return response.data;
    },
    onSuccess(response: StudentDataInterface, data: StudentLoginInterface) {
      if (userType === 'Student') {
        studentLoginSuccess({
          ...response,
          adm_number: data.adm_number,
          token: response.token,
        });
      } else {
        teacherLoginSuccess({
          ...response,
          token: response.token,
        });
      }
    },
  });
  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <Form {...form}>
      <form
        className='w-full grid grid-cols-1 gap-5 mt-10'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {userType === 'Student' ? (
          <InputField
            label='Admission Number'
            placeholder='ADM0000'
            name='adm_number'
          ></InputField>
        ) : (
          <InputField
            label='Employee ID'
            placeholder='EMP0000'
            name='employee_id'
          />
        )}

        <InputField
          label='Password'
          type='password'
          placeholder='Please enter password'
          name='password'
        ></InputField>
        <div className='flex justify-end items-center -mt-4 cursor-pointer'>
          <Link to={`/${userType.toLowerCase()}/forgot-password`}>
            <p className='text-primary font-semibold text-sm'>
              Forgot Password?
            </p>
          </Link>
        </div>
        <Button
          type='submit'
          variant='primary-contained'
          size='large'
          disabled={isPending}
        >
          {isPending && <Loader2 className='animate-spin' />}
          Sign In
        </Button>
        <Button
          onClick={() => {
            if (isAddMore) {
              navigate('/student/home');
            } else {
              resetForm();
            }
          }}
          variant='primary-outlined'
          type='button'
          size='large'
        >
          Back {isAddMore && 'to Home'}
        </Button>
      </form>
    </Form>
  );
}
