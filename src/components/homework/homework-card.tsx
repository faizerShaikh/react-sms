import { FRONTEND_DATE_FORMAT } from '@/constants';
import { HomeworkInterface } from '@/interfaces';
import { cn } from '@/lib/utils';
import { formatDate } from 'date-fns';
import { useNavigate } from 'react-router';

type Props = {
  item: HomeworkInterface;
  isCard: boolean;
  teacher: boolean;
};

export function HomeworkCard({ item, isCard = true, teacher }: Props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (isCard) {
          if (teacher) {
            navigate(`/teacher/homework/${item?.id}`);
          } else {
            navigate(`/student/homework/${item?.id}`);
          }
        }
      }}
    >
      <div
        className={cn(
          'border-gray-100 border-solid border-0 flex flex-col gap-4',
          isCard && 'border-b-[1px] hover:bg-primary-light p-2 cursor-pointer',
        )}
      >
        <div className='flex justify-between items-start gap-2'>
          <div className='flex justify-start items-center gap-2'>
            <div className='flex justify-center items-center gap-2/5 p-2 bg-primary-light rounded-m min-w-12 min-h-12'>
              <i
                className={cn(
                  'ph-duotone',
                  item?.type === 'Resource'
                    ? 'ph-book-open-text'
                    : 'ph-notepad',
                  'text-primary text-2xl',
                )}
              ></i>
            </div>
            <div className='flex flex-col gap-1'>
              {item?.class_subject?.subject && (
                <p
                  className={
                    'text-error m-0 font-semibold font-satoshi text-xs'
                  }
                >
                  {item?.class_subject?.subject?.name}
                </p>
              )}

              <h1
                className={cn(
                  'font-satoshi font-bold text-base leading-5 text-heading',
                  isCard && 'line-clamp-1',
                )}
              >
                {item?.homework_id} : {item?.title}
              </h1>
              {isCard && (
                <p
                  className={
                    'm-0 text-xs font-medium leading-3 font-satoshi text-placeholder line-clamp-1'
                  }
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
              )}

              {!isCard && item && (
                <p
                  className={
                    'm-0 text-[10px] font-medium leading-3 text-primary'
                  }
                >
                  {formatDate(item.created_on, FRONTEND_DATE_FORMAT)}
                </p>
              )}
              {isCard && item && !!item?.attachments?.length && (
                <div
                  className={
                    'mt-3 flex items-center text-success bg-success-light px-[8px] py-[2px] gap-1 rounded-md small-chip w-fit'
                  }
                >
                  <i className='ph-duotone ph-paperclip text-sm'></i>
                  <p className='text-[10px] my-0'>
                    {item.attachments.length} Attachments
                  </p>
                </div>
              )}
            </div>
          </div>
          {isCard && (
            <div
              className={
                'flex justify-center items-center gap-2/5 p-2 bg-primary-light rounded-m min-w-12 min-h-12'
              }
            >
              <i className='ph-fill ph-caret-right text-primary text-2xl'></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const HomeworkCardSkeleton = ({
  length = 7,
  isCard = true,
}: {
  length?: number;
  isCard?: boolean;
}) => {
  return Array.from({ length }).map((_, index) => (
    <div
      key={index}
      className={cn(
        'border-gray-100 border-b p-2 flex flex-col gap-4',
        !isCard && 'border-0',
      )}
    >
      <div className='flex justify-between items-center gap-2'>
        <div className='flex justify-center items-center gap-2/5 p-2 bg-primary-light rounded-sm w-12 h-12'>
          <i
            className={cn(
              'ph-duotone',
              index % 2 === 0 ? 'ph-book-open-text' : 'ph-notepad',
              'text-primary text-2xl',
            )}
          ></i>
        </div>{' '}
        <div className='flex flex-col gap-1 flex-1'>
          <div className='w-full h-4 bg-gray-100 rounded-sm animate-pulse'></div>
          <div className='w-24 h-4 bg-gray-100 rounded-sm animate-pulse'></div>
        </div>
        {isCard && (
          <div
            className={
              'flex justify-center items-center gap-2/5 p-2 bg-primary-light rounded-sm w-12 h-12'
            }
          >
            <i className='ph-fill ph-caret-right text-primary text-2xl'></i>
          </div>
        )}
      </div>
    </div>
  ));
};
