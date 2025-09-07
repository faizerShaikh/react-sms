import { queryClient } from '@/config';
import { api } from '@/configs/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { DocumentViewer } from '../document-viewer';
import { MobileHeader } from '../mobile-header';
import { Button } from '../ui';
import { AnnouncementHeading } from './announcement-heading';
import { AnnouncementDetailSkeleton } from './announcements-skeleton';

type Props = {};

export const AnnouncementDetail = ({}: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: announcement,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['announcement', id],
    queryFn: () =>
      api.get(`/app/announcements/my/${id}/`).then((res) => res.data),
  });

  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: () => api.put(`/app/announcements/my/${id}/`),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['data-with-pagination', '/app/announcements/my/list/'],
        exact: false,
      });
      toast.success('Announcement marked as read.');
      refetch();
      return;
    },
  });

  return (
    <div className={'tb:pl-5 tb:border-l flex-col gap-4 border-gray-200'}>
      <div className='tb:hidden block mb-5'>
        <MobileHeader>
          <div className='flex flex-col justify-center items-center'>
            <span className='!text-heading !font-bold !font-satoshi leading-5'>
              Announcements
            </span>
            <span className='text-gray-400 text-xs font-satoshi !font-normal'>
              {announcement?.announcement?.title || 'Announcement'}
            </span>
          </div>
        </MobileHeader>
      </div>
      <div className='flex flex-col justify-between gap-10 h-[95%] overflow-y-auto'>
        {isLoading ? (
          <AnnouncementDetailSkeleton />
        ) : (
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-6'>
              <AnnouncementHeading
                item={announcement?.announcement}
                showRead
                isRead={announcement?.is_read}
              ></AnnouncementHeading>
              <div
                className='text-sm font-satoshi text-gray-700 overflow-x-auto'
                dangerouslySetInnerHTML={{
                  __html: announcement?.announcement?.content,
                }}
              />
            </div>
            <DocumentViewer
              files={announcement?.announcement?.attachments}
              label={`${announcement?.announcement?.attachments.length} Attachment`}
              hideDelete={true}
              className='my-2 block'
            />
          </div>
        )}
        <div className='flex flex-col gap-4 mt-5'>
          {!announcement?.is_read && !isLoading && (
            <Button
              variant='primary-contained'
              size='large'
              disabled={isPending}
              onClick={() => markAsRead()}
            >
              {isPending && <Loader2 className='animate-spin' />}
              Mark as Read
            </Button>
          )}
          <Button
            className='tb:hidden block'
            variant='primary-outlined'
            size='large'
            onClick={() => navigate('/student/announcements')}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
