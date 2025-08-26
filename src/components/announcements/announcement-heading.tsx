import { AnnouncementReciverInterface } from "@/interfaces";
import { Badge } from "../ui/badge";
import { formatDate } from "date-fns";
import { FRONTEND_DATE_FORMAT } from "@/constants";

type Props = {
  item: AnnouncementReciverInterface;
  showRead?: boolean;
};

export function AnnouncementHeading({ item, showRead }: Props) {
  return (
    <div className='flex justify-between items-start gap-2'>
      <div className='flex justify-start items-center gap-2'>
        <div className='p-2 bg-primary-light rounded flex justify-center items-center h-9 w-9'>
          <i className='ph-duotone ph-megaphone-simple text-primary text-xl'></i>
        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='font-satoshi font-bold text-base leading-5 text-heading'>
            {item.announcement.title}
          </h1>
          <p className='m-0 text-[10px] font-medium leading-3 text-primary'>
            {formatDate(item.announcement.created_on, FRONTEND_DATE_FORMAT)}
          </p>
        </div>
      </div>

      <div className='flex flex-col items-end'>
        {showRead && (
          <Badge
            className='text-end'
            variant={item.is_read ? "success" : "destructive"}
          >
            {item.is_read ? "Read" : "Unread"}
          </Badge>
        )}
        <div className='text-placeholder text-xs mt-1 font-satoshi text-end'>
          {item.announcement.created_by_name}
        </div>
      </div>
    </div>
  );
}
