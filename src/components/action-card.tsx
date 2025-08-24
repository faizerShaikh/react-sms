import { useNavigate } from "react-router";

type ActionCardProps = {
  icon: string;
  direction?: "row" | "col";
  heading: string;
  count?: number | null;
  description: string;
  routerLink?: string;
  queryParams?: Record<string, any>;
  onContainerClick?: () => void;
};

export function ActionCard({
  icon,
  direction,
  heading,
  count,
  description,
  routerLink,
  queryParams,
  onContainerClick,
}: ActionCardProps) {
  const router = useNavigate();
  const onClick = () => {
    if (routerLink) {
      const params = new URLSearchParams(queryParams);
      router(routerLink + "?" + params.toString());
    }

    if (onContainerClick) {
      onContainerClick();
    }
  };
  return (
    <div
      className={`cursor-pointer relative h-full p-4 rounded-lg border border-solid border-gray-100 shadow-xs flex justify-between tb:items-center items-start gap-4 w-full hover:bg-primary-light ${
        direction === "col" ? "flex-col" : ""
      }`}
      onClick={onClick}
    >
      <div className='flex justify-center items-center gap-2/5 p-2 bg-primary-light rounded-m'>
        <i className={`${icon} text-primary text-2xl`}></i>
      </div>
      {!!count && (
        <div className='absolute right-4 top-4 text-error self-baseline bg-[#FDEFEC] !text-xs px-2 py-1 rounded-lg flex justify-start items-center gap-2'>
          <div className='w-[7px] h-[7px] bg-error rounded-full'></div>
          <div>{count} New</div>
        </div>
      )}
      <div className='flex justify-center items-start gap-4 flex-col flex-[1_0_0]'>
        <h2 className='font-satoshi font-extrabold text-lg text-active break-all'>
          {heading}
        </h2>
        <p className='font-satoshi font-medium text-sm text-placeholder'>
          {description}
        </p>
      </div>
    </div>
  );
}
