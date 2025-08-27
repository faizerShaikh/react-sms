import { api } from '@/configs/axios';
import { ResponseInterface } from '@/interfaces';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { NoData } from './no-data';

interface ListWithPaginationProps<T> {
  limit?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderHeader?: (data: ResponseInterface<T[]> | undefined) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  onPageChange?: (page: number) => void;
  className?: string;
  apiUrl: string;
  skeletonComponent?: React.ReactNode;
  noDataMessage?: string;
  skeletonCount?: number;
}

export function ListWithPagination<T>({
  limit = 20,
  renderItem,
  renderHeader,
  renderEmpty,
  onPageChange,
  className,
  apiUrl,
  skeletonComponent,
  skeletonCount = 3,
  noDataMessage,
}: ListWithPaginationProps<T>) {
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery<ResponseInterface<T[]>>({
    queryKey: ['data-with-pagination', apiUrl, limit, page],
    queryFn: () => {
      return api
        .get(apiUrl, {
          params: {
            pg: page,
            limit: limit,
          },
        })
        .then((res) => res.data);
    },
  });

  const hasMore = useMemo(() => {
    if (!data?.count) return false;
    return Math.ceil(data.count / limit) - 1 > page;
  }, [data?.count, limit, page]);

  const totalPages = useMemo(() => {
    if (!data?.count) return 0;
    return Math.ceil(data.count / limit);
  }, [data?.count, limit]);

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    onPageChange?.(nextPage);
  };

  const handlePrev = () => {
    const prevPage = page - 1;
    setPage(prevPage);
    onPageChange?.(prevPage);
  };

  //   const resetPagination = () => {
  //     setPage(0);
  //     onPageChange?.(0);
  //   };

  if (isLoading) {
    return (
      <div className={cn('flex flex-col gap-4', className)}>
        {renderHeader?.(data)}
        <div className='flex flex-col gap-4'>
          {skeletonComponent ||
            Array.from({ length: skeletonCount }).map((_, index) => (
              <div
                key={index}
                className='animate-pulse bg-gray-200 h-20 rounded-md'
              />
            ))}
        </div>
      </div>
    );
  }

  if (!data?.rows || data.rows.length === 0) {
    return (
      <div className={cn('flex flex-col gap-4', className)}>
        {renderHeader?.(data)}
        <div className='h-full mt-10'>
          {renderEmpty?.() || <NoData message={noDataMessage} />}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {renderHeader?.(data)}

      <div className=''>
        {data.rows.map((item, index) => renderItem(item, index))}
      </div>
      <div className='flex justify-between items-center mt-5'>
        {data.count > 0 && (
          <div className='text-center text-sm text-gray-500'>
            Showing {page * limit + 1} to{' '}
            {Math.min((page + 1) * limit, data.count)} of {data.count} items
          </div>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center'>
            <button
              className={cn(
                'rounded-l-md font-medium font-satoshi bg-background disabled:opacity-70 disabled:bg-gray-100 disabled:cursor-default cursor-pointer text-heading px-4 py-2 border border-r-0 border-placeholder border-collapse',
                { 'hover:bg-gray-100': page !== 0 },
              )}
              disabled={page === 0}
              onClick={handlePrev}
            >
              Prev
            </button>
            <button
              className={cn(
                'rounded-r-md font-medium font-satoshi bg-background disabled:opacity-70 disabled:bg-gray-100 disabled:cursor-default cursor-pointer text-heading px-4 py-2 border border-placeholder border-collapse',
                { 'hover:bg-gray-100': !hasMore },
              )}
              disabled={!hasMore}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Hook for managing pagination state
export function usePagination(initialLimit: number = 20) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(initialLimit);

  const resetPagination = () => {
    setPage(0);
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const goToPage = (pageNumber: number) => {
    setPage(Math.max(0, pageNumber));
  };

  return {
    page,
    limit,
    setPage,
    setLimit,
    resetPagination,
    nextPage,
    prevPage,
    goToPage,
  };
}
