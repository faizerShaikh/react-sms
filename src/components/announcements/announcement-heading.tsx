import { FRONTEND_DATE_FORMAT } from '@/constants';
import { AnnouncementInterface } from '@/interfaces';
import { formatDate } from 'date-fns';
import { Badge } from '../ui/badge';

type Props = {
  item: AnnouncementInterface;
  showRead?: boolean;
  isRead?: boolean;
};

export function AnnouncementHeading({ item, showRead, isRead }: Props) {
  return (
    <div className='flex justify-between items-start gap-2'>
      <div className='flex justify-start items-center gap-2'>
        <div className='p-2 bg-primary-light rounded flex justify-center items-center h-9 w-9'>
          <i className='ph-duotone ph-megaphone-simple text-primary text-xl'></i>
        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='font-satoshi font-bold text-base leading-5 text-heading'>
            {item?.title}
          </h1>
          <p className='m-0 text-[10px] font-medium leading-3 text-primary'>
            {item && formatDate(item?.created_on, FRONTEND_DATE_FORMAT)}
          </p>
        </div>
      </div>

      <div className='flex flex-col items-end'>
        {showRead && (
          <Badge
            className='text-end'
            variant={isRead ? 'success' : 'destructive'}
          >
            {isRead ? 'Read' : 'Unread'}
          </Badge>
        )}
        <div className='text-placeholder text-xs mt-1 font-satoshi text-end'>
          {item?.created_by_name}
        </div>
      </div>
    </div>
  );
}
