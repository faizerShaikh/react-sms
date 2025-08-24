import { cn } from "@/lib/utils";
import { Link } from "react-router";

type Props = {
  onClick?: () => void;
  routerLink: string;
  title: string;
  count?: number;
  icon: string;
  className?: string;
};

export function DashboardCard({
  onClick,
  routerLink,
  title,
  count,
  icon,
  className,
}: Props) {
  return (
    <Link to={routerLink}>
      <div
        className={cn(
          "w-full p-4 !pb-0 rounded-lg bg-neutral-100 flex flex-col justify-start shadow-xs relative h-[190px] z-[1] cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <div
          className='relative text-gray-700 font-satoshi font-bold text-lg break-words w-max px-2 rounded-lg'
          style={{ backdropFilter: "blur(20px)" }}
        >
          {title}

          {!!count && (
            <div className='absolute -bottom-6 left-0 text-error self-baseline bg-[#FDEFEC] !text-xs px-2 py-1 rounded-lg flex justify-start items-center gap-2'>
              <div className='w-[7px] h-[7px] bg-error rounded-full'></div>
              <div>{count} New</div>
            </div>
          )}
        </div>
        <div className='flex justify-end items-end w-full h-[calc(100%_-_28px)] lg:h-full lg:-mt-7'>
          <img className='w-auto h-full object-contain lg:-mr-5' src={icon} />
        </div>
      </div>
    </Link>
  );
}
