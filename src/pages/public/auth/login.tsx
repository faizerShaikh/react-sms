import { ActionCard, Button } from "@/components";
import { PowerdBy } from "@/components/powerd-by";
import { schoolConfig } from "@/configs/app-config";
import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { LoginForm } from "./components/login-form";
import { useSearchParams } from "react-router";
import { useAuth } from "@/context/auth-context";

type Props = {};

const studentLoginSchema = yup.object().shape({
  adm_number: yup.string().required("Admission Number is required"),
  password: yup.string().required("Password is required"),
});

const teacherLoginSchema = yup.object().shape({
  employee_id: yup.string().required("Employee ID is required"),
  password: yup.string().required("Password is required"),
});

export function Login({}: Props) {
  const [userType, setUserType] = useState<string | null>(null);
  const [params] = useSearchParams();
  const {
    state: { userData },
  } = useAuth();

  const isAddMore = useMemo(() => {
    return !!(params.get("add_more") === "true" && userData);
  }, [params, userData]);

  useEffect(() => {
    if (isAddMore) {
      setUserType("Student");
    }
  }, [isAddMore]);

  return (
    <div className='sm:p-2 relative p-5 sm:w-[500px] h-screen flex flex-col mx-auto '>
      <div
        className='w-48 h-48 rounded-full fixed top-0 left-5 translate-center bg-primary'
        style={{ filter: "blur(100px)" }}
      ></div>
      <div
        className='w-48 h-48 rounded-full fixed top-[50%] -right-28 bg-primary'
        style={{ filter: "blur(130px)" }}
      ></div>
      <div
        className='mx-auto mt-10'
        style={{ width: "180px", height: "180px" }}
      >
        <img
          className='w-full h-full'
          src={schoolConfig.school_logo_path}
          alt='school logo'
        />
      </div>
      <h1 className='text-gray-800 font-black text-3xl leading-7 text-center font-satoshi'>
        Welcome Back
      </h1>
      <p className='text-sm my-5 w-10/12 mx-auto text-gray-500 font-semibold font-satoshi text-center'>
        Explore learning with joy - where education becomes a thrilling
        adventure!
      </p>
      {userType !== null ? (
        <>
          <LoginForm
            isAddMore={isAddMore}
            userType={userType || "Student"}
            schema={
              userType === "Student" ? studentLoginSchema : teacherLoginSchema
            }
            resetForm={() => setUserType(null)}
          />
          {/* <ng-container *ngIf="isStudent">
 		 <ng-container *ngIf="currentUser; else notLoggedId">
 			 <Separator orientation="horizontal"> Or </Separator>
 			 <button [routerLink]="['/student/home']" smsButton type="button" color="primary-light">
 				 Back to Home
 			 </button>
 		 </ng-container>
 		 <ng-template #notLoggedId>
 			 <div className="text-gray-400 font-medium px-3 font-satoshi text-sm text-center">
 				 Not a Student?	
 				 <span className="text-heading font-semibold font-satoshi" [routerLink]="['/admission']">
 					 Take new Admission
 				 </span>
 			 </div>
 		 </ng-template>
 	 </ng-container> */}
        </>
      ) : (
        <div className='flex items-start flex-col gap-3 self-stretch my-6'>
          <ActionCard
            onContainerClick={() => setUserType("Student")}
            icon='ph-duotone ph-student'
            heading='Student Login'
            description='Login using your Admission Number to access the Student Portal.'
          ></ActionCard>
          <ActionCard
            onContainerClick={() => setUserType("Teacher")}
            icon='ph-duotone ph-chalkboard-teacher'
            heading='Staff Login'
            description='Log in with your Employee ID to access the Staff Portal.'
          ></ActionCard>
          <div className='flex flex-col items-center justify-center gap-2 self-stretch'>
            <Button
              className='md:mt-10'
              size='large'
              variant='primary-light-contained'
              routerLink='/'
            >
              Back
            </Button>
          </div>
        </div>
      )}

      <PowerdBy className='py-5 absolute bottom-0 left-1/2 -translate-x-1/2'></PowerdBy>
    </div>
  );
}
