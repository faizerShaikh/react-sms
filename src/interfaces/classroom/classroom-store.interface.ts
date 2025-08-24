import { ClassroomInterface, PostClassroomStepResponse } from "@/interfaces";

export interface ClassroomStoreInterface {
  currentClassroomStep: number;
  classroomIdsData: PostClassroomStepResponse | null;
  classroomData: null | ClassroomInterface;
  classrooms: ClassroomInterface[] | null;
}
