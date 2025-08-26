import { AnnouncementsList, MobileHeader } from "@/components";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnnouncementReciverInterface } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnnouncementDetail } from "./announcement-detail";
import { api } from "@/configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

type Props = {};

export function MyAnnouncements({}: Props) {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<AnnouncementReciverInterface | null>(null);
  const {
    state: { userData },
  } = useAuth();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  const { mutate: markAsRead, isPending } = useMutation({
    mutationFn: (id: string) => api.put(`/app/announcements/my/${id}/`),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-announcements", userData?.student_id],
      });
      if (variables !== "all-read") {
        setSelectedAnnouncement(null);
        toast.success("Announcement marked as read.");
        return;
      }

      toast.success("All announcements marked as read.");
    },
  });

  return (
    <div
      className={cn(
        "grid grid-cols-1 h-full",
        selectedAnnouncement && "grid-cols-2",
        isMobile && selectedAnnouncement && "!grid-cols-1"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4 tb:overflow-y-auto tb:px-2 tb:-mt-5",
          isMobile && selectedAnnouncement && "hidden"
        )}
      >
        <div className='tb:hidden block'>
          <MobileHeader>Announcements For Me</MobileHeader>
        </div>
        <AnnouncementsList
          selectedAnnouncement={selectedAnnouncement}
          setSelectedAnnouncement={setSelectedAnnouncement}
          markAsRead={markAsRead}
          isLoading={isPending}
        />
      </div>
      <div
        className={cn(
          "tb:pl-5 tb:border-l flex-col gap-4 border-gray-200 hidden",
          selectedAnnouncement && "flex"
        )}
      >
        <div className='tb:hidden block mb-5'>
          <MobileHeader>
            <div className='flex flex-col justify-center items-center'>
              <span className='!text-heading !font-bold !font-satoshi leading-5'>
                Announcements
              </span>
              <span className='text-gray-400 text-xs font-satoshi !font-normal'>
                {selectedAnnouncement?.announcement.title}
              </span>
            </div>
          </MobileHeader>
        </div>
        <AnnouncementDetail
          announcement={selectedAnnouncement!}
          clearAnnouncement={() => setSelectedAnnouncement(null)}
          markAsRead={markAsRead}
          isLoading={isPending}
          isTeacher={false}
        />
      </div>
    </div>
  );
}
