import { api } from "@/configs/axios";
import { useAuth } from "@/context/auth-context";
import { AnnouncementReciverInterface, ResponseInterface } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AnnouncementCard } from "./announcement-card";
import { AnnouncementsSkeleton } from "./announcements-skeleton";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  selectedAnnouncement: AnnouncementReciverInterface | null;
  setSelectedAnnouncement: (
    announcement: AnnouncementReciverInterface | null
  ) => void;
  markAsRead: (id: string) => void;
  isLoading: boolean;
};

export const AnnouncementsList = ({
  selectedAnnouncement,
  setSelectedAnnouncement,
  markAsRead,
  isLoading: isLoadingMarkAsRead,
}: Props) => {
  const [page, setPage] = useState(0);
  const {
    state: { userData },
  } = useAuth();

  const { data: announcements, isLoading } = useQuery<
    ResponseInterface<AnnouncementReciverInterface[]> & { isAllRead: boolean }
  >({
    queryKey: userData?.student_id
      ? ["my-announcements", userData?.student_id, page]
      : [],
    queryFn: () =>
      api
        .get("/app/announcements/my/list/", {
          params: {
            pg: page,
            limit: 10,
          },
        })
        .then((res) => res.data),
    enabled: !!userData?.student_id,
  });

  const hasMore = useMemo(() => {
    return Math.ceil((announcements?.count ?? 0) / 10) - 1 > page;
  }, [announcements?.count, page]);

  return (
    <div className='flex flex-col gap-4'>
      <button
        disabled={isLoadingMarkAsRead || announcements?.isAllRead}
        className={cn(
          "w-full text-primary cursor-pointer text-base flex justify-end items-center gap-2",
          {
            "!text-gray-400": announcements?.isAllRead,
            "!cursor-default": announcements?.isAllRead,
          }
        )}
        onClick={() => !announcements?.isAllRead && markAsRead("all-read")}
      >
        {isLoadingMarkAsRead ? (
          <Loader2 className='animate-spin' />
        ) : (
          <i className='ph-bold ph-checks'></i>
        )}

        <span className='underline'> Mark all as read </span>
      </button>

      {isLoading ? (
        <AnnouncementsSkeleton count={5} />
      ) : (
        announcements?.rows?.map((announcement) => (
          <AnnouncementCard
            showRead
            key={announcement.id}
            item={announcement}
            isSelected={selectedAnnouncement?.id === announcement.id}
            setSelectedAnnouncement={setSelectedAnnouncement}
          />
        ))
      )}
      <div className='flex justify-center items-center mt-5'>
        <button
          className={cn(
            "rounded-l-md font-medium font-satoshi bg-background disabled:opacity-70 disabled:bg-gray-100 disabled:cursor-default cursor-pointer text-heading px-4 py-2 border border-r-0 border-placeholder border-collapse",
            { "hover:bg-gray-100": page !== 0 }
          )}
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className={cn(
            "rounded-r-md font-medium font-satoshi bg-background disabled:opacity-70 disabled:bg-gray-100 disabled:cursor-default cursor-pointer text-heading px-4 py-2 border border-placeholder border-collapse",
            { "hover:bg-gray-100": !hasMore }
          )}
          disabled={!hasMore}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
