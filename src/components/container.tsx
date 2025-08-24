import { useAuth } from "@/context/auth-context";
import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  children: React.ReactNode;
};

export function Container({ children }: Props) {
  const {
    state: { userData, menuItems },
  } = useAuth();

  const navigate = useNavigate();

  return (
    <div className='flex flex-col h-screen max-w-[959px] mx-auto relative'>
      <div className='px-5 mb-5 py-3 bg-primary rounded-bl-[2rem] header flex justify-between items-center gap-3 w-full absolute top-0 left-0 z-10'>
        <div className='flex justify-start items-center gap-3'>
          <i
            className='ph ph-caret-left text-2xl text-gray-50'
            onClick={() => {}}
          ></i>
          <div className='flex flex-col'>
            <h1 className='font-satoshi text-xl text-gray-50 truncate w-52'>
              👋 Hey {userData?.name},
            </h1>
            <p className='font-satoshi text-sm text-gray-100'>
              Class {userData?.standard}
            </p>
          </div>
        </div>
        <Link to={"/student/my-profile"}>
          <Avatar className='block w-12 h-12'>
            <AvatarImage
              src={`${import.meta.env.VITE_MEDIA_FOLDER_URL}${userData?.photo}`}
              alt={userData?.name}
            />
            <AvatarFallback>
              {userData?.name?.[0]}
              {userData?.name?.split(" ")[1]?.[0]}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className='bg-white p-5 sm:p-5 overflow-y-auto h-[calc(100vh_-_160px)] mt-20'>
        {children}
      </div>
      <div
        className='z-[1001] absolute bg-background rounded-t-2xl bottom-0 left-1/2 w-full pt-2 px-2 flex justify-between items-center gap-2 pb-5'
        style={{
          boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.09)",
          transform: "translateX(-50%)",
        }}
      >
        {menuItems.map((item) => (
          <div
            className='flex flex-col justify-center items-center text-gray-500 flex-1 py-1 px-1 cursor-pointer'
            key={item.label}
            onClick={() => {
              item.routerLink && navigate(item.routerLink);
            }}
          >
            <i className={`text-2xl text-inherit ${item.icon}`}></i>
            <span className='text-xs text-inherit font-bold font-satoshi text-center label'>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
