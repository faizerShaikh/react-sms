import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  isCard?: boolean;
};

export function AnnouncementCardSkeleton({ className, isCard = true }: Props) {
  return (
    <div
      className={cn(
        'border-slate-100 border-solid border-[1px] rounded-lg p-4 flex flex-col gap-3',
        isCard && 'shadow-s',
        className,
        !isCard && 'border-0',
      )}
    >
      {/* Header section - mimics AnnouncementHeading */}
      <div className={cn('flex flex-col gap-2', !isCard && 'mb-10')}>
        {/* Title skeleton */}
        <Skeleton className='h-5 w-3/4' />

        {/* Meta information skeleton */}
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>

      {/* Content section - mimics the announcement content */}
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-5/6' />
        <Skeleton className='h-4 w-4/5' />
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-2/3' />
      </div>

      {/* Footer section - mimics attachments and read more */}
      <div className='flex justify-between items-center'>
        {/* Attachments skeleton */}
        <div className='flex items-center gap-1'>
          <Skeleton className='h-3 w-3' />
          <Skeleton className='h-3 w-16' />
        </div>

        {/* Read more skeleton */}
        <Skeleton className='h-4 w-20' />
      </div>
    </div>
  );
}
