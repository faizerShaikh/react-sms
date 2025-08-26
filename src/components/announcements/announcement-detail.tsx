import { AnnouncementHeading } from "./announcement-heading";
import { Button } from "../ui";
import { AnnouncementReciverInterface } from "@/interfaces";
import { DocumentViewer } from "../document-viewer";
import { Loader2 } from "lucide-react";

type Props = {
  announcement: AnnouncementReciverInterface;
  clearAnnouncement: () => void;
  markAsRead: (id: string) => void;
  isTeacher: boolean;
  isLoading: boolean;
};

export const AnnouncementDetail = ({
  announcement,
  clearAnnouncement,
  markAsRead,
  isTeacher,
  isLoading,
}: Props) => {
  if (!announcement) return null;
  return (
    <div className='flex flex-col justify-between gap-10 h-[95%] overflow-y-auto'>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-6'>
          <AnnouncementHeading
            item={announcement}
            showRead
          ></AnnouncementHeading>
          <div
            className='text-sm font-satoshi text-gray-700'
            dangerouslySetInnerHTML={{
              __html: announcement.announcement.content,
            }}
          />
        </div>
        <DocumentViewer
          files={announcement.announcement.attachments}
          label={`${announcement.announcement.attachments.length} Attachment`}
          hideDelete={true}
          className='my-2 block'
        />
        {/* <sms-document-viewer
			  className="my-2 block"
			  [label]="announcement.announcement.attachments.length + ' Attachment'"
			  [files]="announcement.announcement.attachments"
			  [hideDelete]="true"
		  ></sms-document-viewer> */}
      </div>
      <div className='flex flex-col gap-4 mt-5'>
        {!announcement.is_read && !isTeacher && (
          <Button
            variant='primary-contained'
            size='large'
            disabled={isLoading}
            onClick={() => markAsRead(announcement.id)}
          >
            {isLoading && <Loader2 className='animate-spin' />}
            Mark as Read
          </Button>
        )}
        <Button
          className='tb:hidden block'
          variant='primary-outlined'
          size='large'
          onClick={clearAnnouncement}
        >
          Back
        </Button>
      </div>
    </div>
  );
};
