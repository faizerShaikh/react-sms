import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Props = {
  children: React.ReactNode;
};

export function Container({ children }: Props) {
  const {
    state: { userData, menuItems },
  } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const shouldShowHeader = ['/student/home', '/teacher/home'].includes(
    pathname,
  );
  return (
    <div className='flex flex-col h-screen max-w-[959px] mx-auto relative'>
      {shouldShowHeader && (
        <div className='px-5 mb-5 py-3 bg-primary rounded-bl-[2rem] header flex justify-between items-center gap-3 w-full absolute top-0 left-0 z-10'>
          <div className='flex justify-start items-center gap-3 w-full'>
            <i
              className='ph ph-caret-left text-2xl text-gray-50'
              onClick={() => window.history.back()}
            ></i>
            <div className='flex flex-col w-full'>
              <h1 className='font-satoshi text-xl text-gray-50 truncate max-w-72'>
                👋 Hey {userData?.name},
              </h1>
              <p className='font-satoshi text-sm text-gray-100'>
                Class {userData?.standard}
              </p>
            </div>
          </div>
          <Link
            to={'/student/my-profile'}
            className='w-13 h-13 flex justify-center items-center border border-white rounded-full p-1'
          >
            <Avatar className='block w-12 h-12'>
              <AvatarImage
                className='object-cover object-center'
                src={`${import.meta.env.VITE_MEDIA_FOLDER_URL}${
                  userData?.photo
                }`}
                alt={userData?.name}
              />
              <AvatarFallback>
                {userData?.name?.[0]}
                {userData?.name?.split(' ')[1]?.[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      )}
      <div
        className={`bg-white p-5 sm:p-5 overflow-y-auto ${
          shouldShowHeader
            ? 'h-[calc(100vh_-_160px)] mt-20'
            : 'h-[calc(100vh_-_100px)]'
        }`}
      >
        {children}
      </div>
      <div
        className='z-[1001] fixed bg-primary rounded-full bottom-4 left-1/2 w-[90%] max-w-[450px] p-2 flex justify-between items-center gap-2'
        style={{
          // boxShadow:
          //   'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
          boxShadow:
            '0px 5px 30px -3px rgba(0, 0, 0, 0.5), 0px 4px 6px -4px rgba(16, 24, 40, 0.10)',
          transform: 'translateX(-50%)',
        }}
      >
        {menuItems.map((item) => (
          <div
            className={cn(
              'flex gap-3 justify-center items-center rounded-full text-white transition-all duration-300 flex-row px-4 py-3 cursor-pointer',
              pathname === item.routerLink && 'text-primary bg-white font-bold',
            )}
            key={item.label}
            style={{
              boxShadow:
                pathname === item.routerLink
                  ? '5px 5px 8px -3px rgba(0, 0, 0, 0.8)'
                  : 'none',
            }}
            onClick={() => {
              item.routerLink && navigate(item.routerLink);
            }}
          >
            <item.icon
              size={20}
              className={`text-inherit transition-all duration-300 ${
                pathname === item.routerLink ? 'text-primary' : 'text-white'
              }`}
            />
            {pathname === item.routerLink && (
              <span className='text-xs text-inherit font-satoshi text-center label'>
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
