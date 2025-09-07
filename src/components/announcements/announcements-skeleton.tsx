import { cn } from '@/lib/utils';
import { AnnouncementCardSkeleton } from './announcement-card-skeleton';

type Props = {
  count?: number;
  className?: string;
};

export function AnnouncementsSkeleton({ count = 3, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <AnnouncementCardSkeleton key={index} />
      ))}
    </div>
  );
}

export const AnnouncementDetailSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <AnnouncementCardSkeleton isCard={false} />
    </div>
  );
};
