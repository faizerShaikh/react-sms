import { useAuth } from "@/context/auth-context";
import { StudentDataInterface } from "@/interfaces";
import { MobileResponsiveDialog } from "./mobile-responsive-dialog";
import { Button } from "./ui";

type Props = {
  userData: StudentDataInterface | null;
};

export function LogoutAlert({ userData }: Props) {
  const { removeUser } = useAuth();
  return (
    <MobileResponsiveDialog
      heading={"Logout Student"}
      onClose={() => {}}
      trigger={
        <div className='flex justify-center items-center p-3 hover:bg-slate-100 transition-all duration-300 rounded-full cursor-pointer'>
          <i className='ph-sign-out ph text-primary text-2xl'></i>
        </div>
      }
    >
      {({ onClose }) => (
        <div className='p-5 flex justify-center items-center flex-col gap-2'>
          <div className='flex justify-center items-center rounded-full text-5xl p-8 bg-blue-50 text-blue-600'>
            <i className='ph-duotone ph-info text-2xl'></i>
          </div>

          <p className='text-heading font-medium text-sm font-satoshi'>
            Are you sure you want to logout?
          </p>
          <div className='mb-4 border border-dashed border-gray-200 w-full'></div>
          <div className='flex gap-4 justify-end items-center md:flex-row flex-col w-full'>
            <Button
              type='button'
              variant='primary-contained'
              className='font-normal rounded-md'
              size={"large"}
              onClick={() => {
                removeUser(userData);
              }}
            >
              Yes, Logout
            </Button>
            <Button
              type='button'
              variant='outline'
              className='font-normal rounded-md'
              size={"large"}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </MobileResponsiveDialog>
  );
}
