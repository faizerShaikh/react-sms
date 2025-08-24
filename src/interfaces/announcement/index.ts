import { BaseObjectInterface } from "@/interfaces";
import { AttachmentInterface, ResponseInterface } from "../other";
import { StandardInterface, UserInterface } from "../settings";
import { StudentInterface } from "../student";

export interface AnnouncementInterface extends BaseObjectInterface {
  created_by: UserInterface;
  title: string;
  content: string;
  receivers_type: string;
  created_by_name: string;
  standard: StandardInterface;
  division: { name: string };
  receivers: AnnouncementReciverInterface[];
  attachments: AttachmentInterface[];
}

export interface AnnouncementReciverInterface extends BaseObjectInterface {
  announcement: AnnouncementInterface;
  receiver_type: string;
  is_read: boolean;
  read_at: any;
  student: StudentInterface;
  teacher: any;
}

export interface MyAnnouncementsInterace
  extends ResponseInterface<AnnouncementReciverInterface[]> {
  isAllRead: boolean;
}

export interface AnnouncementStoreInterface {
  myAnnouncements: MyAnnouncementsInterace | null;
  announcement: AnnouncementReciverInterface | AnnouncementInterface | null;
  myAnnouncementsCount: number | null;
}
