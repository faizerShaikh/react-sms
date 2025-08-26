import { cn } from "@/lib/utils";
import { AnnouncementHeading } from "./announcement-heading";
import { AnnouncementReciverInterface } from "@/interfaces";
type Props = {
  item: AnnouncementReciverInterface;
  showRead?: boolean;
  isSelected: boolean;
  setSelectedAnnouncement: (
    announcement: AnnouncementReciverInterface | null
  ) => void;
};

export function AnnouncementCard({
  item,
  showRead,
  isSelected,
  setSelectedAnnouncement,
}: Props) {
  return (
    <div
      className={cn(
        "border-slate-100 shadow-s border-solid border-[1px] cursor-pointer rounded-lg p-4 flex flex-col gap-3 hover:bg-primary-light",
        {
          "bg-primary-light": isSelected,
        }
      )}
      onClick={() => setSelectedAnnouncement(item)}
    >
      <AnnouncementHeading item={item} showRead={showRead} />
      <p
        className='m-0 text-placeholder text-sm font-medium font-satoshi line-clamp-5'
        dangerouslySetInnerHTML={{ __html: item.announcement.content }}
      ></p>
      <div
        className={cn("flex justify-between items-center", {
          "!justify-end": !item.announcement.attachments.length,
        })}
      >
        {!!item.announcement.attachments.length && (
          <div className='flex justify-start items-center text-primary gap-1 font-medium text-xs'>
            <i className='ph-bold ph-paperclip'></i>

            <span className='font-satoshi underline'>
              {item.announcement.attachments.length}
              Attachment
            </span>
          </div>
        )}
        <span className='font-satoshi font-medium text-sm underline text-primary'>
          {" "}
          Read More{" "}
        </span>
      </div>
    </div>
  );
}
