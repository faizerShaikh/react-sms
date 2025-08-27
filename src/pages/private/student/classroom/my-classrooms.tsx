import {
  Heading,
  HomeworkCard,
  HomeworkCardSkeleton,
  ListWithPagination,
  NoData,
} from '@/components';
import { MobileHeader } from '@/components/mobile-header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/configs/axios';
import { useAuth } from '@/context/auth-context';
import { ClassSubjectInterface } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

type Props = {};

export function MyClassroom({}: Props) {
  const {
    state: { userData },
  } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(
    undefined,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const subject = searchParams.get('subject');

  const { data: subjects, isLoading: isSubjectsLoading } = useQuery<
    ClassSubjectInterface[]
  >({
    queryKey: ['subjects-list', userData?.student_id],
    queryFn: () => api.get('/app/subjects-list/').then((res) => res.data),
    enabled: !!userData?.student_id,
  });

  useEffect(() => {
    if (subjects && subjects.length > 0) {
      if (subject) {
        setSelectedSubject(subject);
      } else {
        setSelectedSubject(subjects[0].id.toString());
      }
    }
  }, [subjects, subject]);

  return (
    <div>
      <div className='tb:hidden block mb-8'>
        <MobileHeader>My Classroom</MobileHeader>
      </div>

      <Heading>Homework</Heading>
      {!isSubjectsLoading && subjects && subjects.length > 0 ? (
        <Tabs
          className='mt-4'
          value={selectedSubject}
          onValueChange={(value) => {
            setSelectedSubject(value);
            setSearchParams({ subject: value });
          }}
        >
          <TabsList className='bg-white overflow-x-auto max-w-full overflow-y-hidden justify-start tabs-wrapper rounded-none'>
            {subjects?.map((subject) => (
              <TabsTrigger
                className='px-4 py-4 rounded-full border border-gray-200 text-xs whitespace-nowrap mr-5 cursor-pointer data-[state=active]:bg-primary-light data-[state=active]:text-heading data-[state=active]:font-semibold data-[state=active]:border-primary transition-all duration-300'
                key={subject.id}
                value={subject.id.toString()}
              >
                {subject.name}
                <Badge
                  className='ml-2 rounded-full'
                  variant={
                    selectedSubject === subject.id.toString()
                      ? 'primary'
                      : 'primary-light'
                  }
                >
                  {subject.homework_count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : (
        <div className='text-center py-8'>
          <NoData />
          <p className='text-gray-600 mt-4'>
            There are no subjects assigned to you
          </p>
        </div>
      )}
      {selectedSubject && (
        <ListWithPagination
          className='mt-5'
          noDataMessage='No homework assigned to you'
          apiUrl={`/subject-homeworks/${selectedSubject}/`}
          renderItem={(item: any) => (
            <HomeworkCard item={item} isCard={true} teacher={false} />
          )}
          skeletonComponent={<HomeworkCardSkeleton />}
        />
      )}
    </div>
  );
}
