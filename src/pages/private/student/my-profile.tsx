import { Heading } from "@/components/heading";
import { LogoutAlert } from "@/components/logout-alert";
import { MobileHeader } from "@/components/mobile-header";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Link } from "react-router";

type Props = {};

export function MyProfile({}: Props) {
  const {
    state: { userData, usersData },
    setCurrentUser,
  } = useAuth();
  return (
    <div className='flex flex-col gap-5 max-w-[700px] mx-auto'>
      <div className='tb:hidden block'>
        <MobileHeader>My Profile</MobileHeader>
      </div>

      <div className='flex justify-between items-center shadow-xs border border-solid border-gray-100 rounded-lg px-3 py-3'>
        <div className='flex justify-start items-center gap-2'>
          <Avatar className='w-16 h-16'>
            <AvatarImage
              src={
                import.meta.env.VITE_MEDIA_FOLDER_URL + userData?.photo || ""
              }
              className='object-cover object-center'
            />
            <AvatarFallback>
              {userData?.name?.charAt(0) +
                (userData?.name?.split(" ")[1]?.charAt(0) || "")}
            </AvatarFallback>
          </Avatar>
          <div className='flex justify-start items-start flex-col'>
            <h4 className='text-heading font-semibold text-base font-satoshi'>
              {userData?.name}
            </h4>
            <p className='text-placeholder font-medium text-sm font-satoshi'>
              {userData?.admissionNumber} | {userData?.standard}
            </p>
          </div>
        </div>
        <LogoutAlert userData={userData} />
      </div>
      <Heading variant='secondary'>Other Students</Heading>
      <Alert variant={"info"} className='flex justify-start items-center gap-2'>
        <i className='ph-info ph'></i>
        <AlertTitle>
          You can add more student accounts to manage multiple students.
        </AlertTitle>
      </Alert>
      <Link to='/login?add_more=true'>
        <div className='cursor-pointer flex justify-center items-center gap-2 text-primary font-satoshi text-base font-medium'>
          <i className='ph-plus ph'></i>
          Add More Account
        </div>
      </Link>
      {usersData?.map(
        (item) =>
          item.admissionNumber !== userData?.admissionNumber && (
            <div className='flex justify-between items-center shadow border border-solid border-gray-100 rounded-lg p-2 hover:bg-slate-100 cursor-pointer'>
              <div
                className='flex justify-start items-center gap-2'
                onClick={() => {
                  setCurrentUser(item);
                }}
              >
                <Avatar className='w-16 h-16'>
                  <AvatarImage
                    className='object-cover object-center'
                    src={
                      import.meta.env.VITE_MEDIA_FOLDER_URL + item?.photo || ""
                    }
                  />
                  <AvatarFallback>
                    {item?.name?.charAt(0) +
                      (item?.name?.split(" ")[1]?.charAt(0) || "")}
                  </AvatarFallback>
                </Avatar>

                <div className='flex justify-start items-start flex-col'>
                  <h4 className='text-heading font-semibold text-base font-satoshi'>
                    {item.name}
                  </h4>
                  <p className='text-placeholder font-medium text-sm font-satoshi'>
                    Admission Number :- {item.admissionNumber}
                  </p>
                </div>
              </div>
              <LogoutAlert userData={item} />
            </div>
          )
      )}
    </div>
  );
}
