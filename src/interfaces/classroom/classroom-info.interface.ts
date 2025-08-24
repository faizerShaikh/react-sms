import { StandardInterface } from "../settings";
import { TeacherInterface } from "../teacher";

export interface ClassroomInfoInterface {
    academic_year: string;
    standard: StandardInterface;
    division_name: string;
    class_teacher: TeacherInterface;
}

export interface PostClassroomInfoInterface {
    step: number;
    academic_year: string;
    standard: string;
    division_name: string;
    class_teacher: string;
    is_update: boolean;
}

export interface PostClassroomStepResponse {
    division?: {
        id: string;
        name: string;
        student_count: number;
        division_name: string;
        is_active: boolean;
        academic_year: string;
        standard: string;
        class_teacher: string;
    };
    classroom: string;
    currentClassroomStep: number;
}
