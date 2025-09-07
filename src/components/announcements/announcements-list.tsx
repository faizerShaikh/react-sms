import { AnnouncementReciverInterface } from '@/interfaces';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ListWithPagination } from '../list-with-pagination';
import { AnnouncementCard } from './announcement-card';
import { AnnouncementsSkeleton } from './announcements-skeleton';

type Props = {
  markAsRead: (id: string) => void;
  isLoading: boolean;
};

export const AnnouncementsList = ({
  markAsRead,
  isLoading: isLoadingMarkAsRead,
}: Props) => {
  return (
    <ListWithPagination
      apiUrl='/app/announcements/my/list/'
      renderItem={(item: AnnouncementReciverInterface) => (
        <AnnouncementCard showRead key={item.id} item={item} />
      )}
      renderHeader={(data: any) => (
        <div className='flex justify-end items-center gap-2 w-full'>
          <button
            disabled={isLoadingMarkAsRead || data?.isAllRead}
            className={cn(
              'w-full text-primary cursor-pointer text-base flex justify-end items-center gap-2',
              {
                '!text-gray-400': data?.isAllRead,
                '!cursor-default': data?.isAllRead,
              },
            )}
            onClick={() => !data?.isAllRead && markAsRead('all-read')}
          >
            {isLoadingMarkAsRead ? (
              <Loader2 className='animate-spin' />
            ) : (
              <i className='ph-bold ph-checks'></i>
            )}

            <span className='underline'> Mark all as read </span>
          </button>
        </div>
      )}
      skeletonComponent={<AnnouncementsSkeleton count={5} />}
    />
  );
};
