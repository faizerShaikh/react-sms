import { DashboardCard, Heading } from '@/components';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { api } from '@/configs/axios';
import { useAuth } from '@/context/auth-context';
import { AdmissionInstalmentInterface } from '@/interfaces';
import { getWithOrdinalSuffix } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { StudentAttendanceChart } from './components/student-attendance-chart';
type Props = {};

export function StudentHome({}: Props) {
  const {
    state: { userData },
  } = useAuth();
  const navigate = useNavigate();

  const { data: myAnnouncementsCount } = useQuery({
    queryKey: ['myAnnouncementsCount', userData?.student_id],
    queryFn: () =>
      api.get('/app/announcements/my/unread_count/').then((res) => res.data),
    enabled: !!userData,
  });

  const { data: admissionFeesData } = useQuery({
    queryKey: ['admissionFeesData', userData?.admission_id],
    queryFn: () =>
      api
        .get(`/schools/admission-fees-instalment/${userData?.admission_id}/`)
        .then((res) => res.data),
    enabled: !!userData?.admission_id,
  });

  const pendingTaks = useMemo(() => {
    let tasks = [];
    if (!userData?.is_id_card_filled) {
      tasks.push({
        title: 'Fill ID Card Form',
        description:
          'Please complete the ID card form to ensure accurate and up-to-date records. Your cooperation is appreciated.',
        link: '/student/admission/id-card-form',
      });
    }
    if (!userData?.is_document_added) {
      tasks.push({
        title: 'Upload Student Documents',
        description:
          'Please Upload Student Docuents to ensure accurate and up-to-date records. Your cooperation is appreciated.',
        link: '/student/admission/documents',
      });
    }
    return tasks;
  }, [userData]);

  return (
    <div className='flex flex-col gap-5'>
      {userData && pendingTaks.length > 0 && (
        <Accordion type='single' collapsible className='z-10'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='border-b py-2 rounded-none'>
              <Heading>
                <div className='flex justify-between items-center w-full gap-3'>
                  <div>Complete pending tasks</div>
                  <Badge variant='primary'>{pendingTaks.length}</Badge>
                </div>
              </Heading>
            </AccordionTrigger>
            <AccordionContent className='flex flex-col gap-3 pt-1'>
              {pendingTaks.map((task) => (
                <Alert
                  variant='info'
                  className='flex items-start gap-3 py-2 px-2'
                >
                  <div>
                    <i className='ph-bold ph-arrow-square-out'></i>
                  </div>
                  <div>
                    <AlertTitle>{task.title}</AlertTitle>
                    <AlertDescription>{task.description}</AlertDescription>{' '}
                    <span
                      className='underline cursor-pointer'
                      onClick={() => navigate(task.link)}
                    >
                      Click Here
                    </span>
                  </div>
                </Alert>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        <DashboardCard
          className='block lg:h-full'
          routerLink='/student/homework'
          icon='/images/student-portal/classroom.png'
          title='Classroom'
        ></DashboardCard>
        <DashboardCard
          className='block lg:h-full z-[9]'
          count={myAnnouncementsCount?.unread_count}
          routerLink='/student/announcements'
          icon='/images/student-portal/announcements.png'
          title='Announcements'
        ></DashboardCard>
        <DashboardCard
          className='block lg:h-full'
          routerLink='/student/home'
          icon='/images/student-portal/exam.png'
          title='Exam Results'
        ></DashboardCard>
        <DashboardCard
          routerLink='/student/home'
          className='block lg:h-full'
          icon='/images/student-portal/resource.png'
          title='Resources'
        ></DashboardCard>
      </div>
      <div className='flex flex-col lg:flex-row gap-5'>
        <StudentAttendanceChart />
        <div className='flex flex-col gap-5 lg:w-1/2'>
          <Heading>Fees Status</Heading>
          <div className='flex flex-col gap-3'>
            {admissionFeesData?.admission_instalments.map(
              (item: AdmissionInstalmentInterface) => (
                <Link to='/student/admission/fees' key={item.id}>
                  <div className='border border-solid border-gray-100 rounded-lg py-2 px-3 cursor-pointer'>
                    <div className='text-active font-satoshi text-base font-bold flex justify-between items-center gap-3 mb-2'>
                      <span>
                        {' '}
                        {getWithOrdinalSuffix(item.installment_no)}{' '}
                        Instalment{' '}
                      </span>
                      <Badge variant={!item.is_paid ? 'warning' : 'success'}>
                        {item.is_paid ? 'Paid' : 'Due'}
                      </Badge>
                    </div>
                    <div className='text-placeholder text-sm font-medium font-satoshi'>
                      &#8377; {item.total_amount}
                    </div>
                  </div>
                </Link>
              ),
            )}

            <Link to='/student/admission/fees'>
              <div className='text-primary text-sm cursor-pointer flex justify-center items-center gap-1'>
                <i className='ph-bold ph-eye text-sm'></i>
                <span className='underline cursor-pointer'>See More</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
