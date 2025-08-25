import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/form-components";
import { Link } from "react-router";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/configs/axios";
import { StudentDataInterface, StudentLoginInterface } from "@/interfaces";
import { useAuth } from "@/context/auth-context";
import { ImSpinner8 } from "react-icons/im";
import { Loader2 } from "lucide-react";

type Props = {
  userType: string;
  schema: any;
  resetForm: () => void;
};

export function LoginForm({ userType, schema, resetForm }: Props) {
  const { studentLoginSuccess } = useAuth();

  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: {
      [userType == "Student" ? "adm_number" : "employee_id"]: "",
      password: "",
    },
    mode: "onChange",
  });
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (data: StudentLoginInterface) => {
      const response = await api.post<StudentDataInterface>(
        "/accounts/student-login/",
        data
      );
      return response.data;
    },
    onSuccess(response: StudentDataInterface, data: StudentLoginInterface) {
      studentLoginSuccess({
        ...response,
        adm_number: data.adm_number,
        token: response.token,
      });
    },
    onError(error: any) {
      console.log(error, "<=====error");
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
        {userType === "Student" ? (
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
          onClick={resetForm}
          variant='primary-outlined'
          type='button'
          size='large'
        >
          Back
        </Button>
      </form>
    </Form>
  );
}
