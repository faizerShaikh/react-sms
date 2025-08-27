import {
  Button,
  DocumentViewer,
  HomeworkCard,
  HomeworkCardSkeleton,
  MobileHeader,
} from '@/components';
import { NoData } from '@/components/no-data';
import { api } from '@/configs/axios';
import { useAuth } from '@/context/auth-context';
import { HomeworkTypeEnum } from '@/enum';
import { AssignmentInterface, HomeworkInterface } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { SubmitAssignment } from './components/submit-assignment';

interface HomeworkDetailsProps {
  homework?: HomeworkInterface;
  children: React.ReactNode;
}

const HomeworkPageSkeleton = () => {
  return (
    <div className=''>
      <MobileHeader>
        <div className='w-full truncate pl-[50px]'>
          <div className='h-4 animate-pulse mx-auto bg-gray-100 rounded w-[200px]'></div>
        </div>
      </MobileHeader>

      <div className='px-4 py-6'>
        <HomeworkCardSkeleton length={1} isCard={false} />
        <div className='mt-5'>
          <div className='w-[100px] h-4 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
          <div className='w-full h-4 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
          <div className='w-full h-4 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
          <div className='w-full h-4 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
          <div className='w-full h-4 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
          <div className='w-1/2 h-4 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
        </div>
        <div className='mt-5'>
          <div className='w-1/2 h-4 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
          <div className='w-[50px] h-4 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
        </div>
        <div className='mt-5'>
          <div className='w-full h-12 bg-gray-100 rounded-sm animate-pulse mb-2'></div>
        </div>
      </div>
    </div>
  );
};

const HomeworkDetails: React.FC<HomeworkDetailsProps> = ({
  homework,
  children,
}) => {
  const navigate = useNavigate();
  if (!homework) return null;

  return (
    <div>
      <div className='relative'>
        <HomeworkCard isCard={false} item={homework} teacher={false} />
      </div>
      <div className='mt-5'>
        <div
          className='text-sm font-satoshi text-heading'
          dangerouslySetInnerHTML={{ __html: homework?.description }}
        ></div>

        <div className='flex flex-col gap-1 mt-5'>
          <DocumentViewer
            files={homework?.attachments || []}
            label={`${homework?.attachments?.length || 0} Attachment`}
            hideDelete={true}
          />
        </div>

        <div className='flex flex-col gap-3 w-full mt-3'>
          {children}

          <Button
            className='w-full'
            variant='primary-outlined'
            size='large'
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export const StudentHomeworkDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    state: { userData },
  } = useAuth();

  const {
    data: homework,
    isLoading,
    error,
    refetch,
  } = useQuery<HomeworkInterface>({
    queryKey: ['homework-details', id],
    queryFn: () => api.get(`/app/homeworks/${id}/`).then((res) => res.data),
    enabled: !!id,
  });

  const myAssignment: AssignmentInterface | null = useMemo(
    () =>
      homework?.assignments?.find(
        (item) => item.student.id === userData?.student_id,
      ) || null,
    [homework?.assignments, userData?.student_id],
  );

  if (isLoading) {
    return <HomeworkPageSkeleton />;
  }

  return (
    <div className=''>
      <MobileHeader>
        <div className='w-full truncate pl-[50px]'>
          {homework?.homework_id || 'HWXXXX'} : {homework?.title || 'Homework'}
        </div>
      </MobileHeader>

      <div className='px-4 py-6'>
        {error || !homework ? (
          <div className='text-center py-8'>
            <NoData />
            <p className='text-gray-600 mt-4'>
              Failed to load homework details
            </p>
          </div>
        ) : (
          <HomeworkDetails homework={homework}>
            {homework.type !== HomeworkTypeEnum.RESOURCE && (
              <SubmitAssignment
                refetch={refetch}
                homeworkId={homework.id}
                myAssignment={myAssignment}
              />
            )}
          </HomeworkDetails>
        )}
      </div>
    </div>
  );
};
