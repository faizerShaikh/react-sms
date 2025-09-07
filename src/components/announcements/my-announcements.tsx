import { AnnouncementsList, MobileHeader } from '@/components';
import { api } from '@/configs/axios';
import { useAuth } from '@/context/auth-context';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type Props = {};

export function MyAnnouncements({}: Props) {
  const {
    state: { userData },
  } = useAuth();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: (id: string) => api.put(`/app/announcements/my/${id}/`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['my-announcements', userData?.student_id],
      });
      if (variables !== 'all-read') {
        toast.success('Announcement marked as read.');
        return;
      }

      toast.success('All announcements marked as read.');
    },
  });

  return (
    <div className={cn('grid grid-cols-1 h-full', isMobile && '!grid-cols-1')}>
      <div
        className={cn(
          'flex flex-col gap-4 tb:overflow-y-auto tb:px-2 tb:-mt-5 w-full',
        )}
      >
        <div className='tb:hidden block'>
          <MobileHeader>Announcements For Me</MobileHeader>
        </div>
        <AnnouncementsList markAsRead={markAsRead} isLoading={isPending} />
      </div>
    </div>
  );
}
