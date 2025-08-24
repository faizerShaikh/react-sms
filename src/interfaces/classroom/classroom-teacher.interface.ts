export interface ClassroomTeacherInterface {
    subject_teachers: { class_subject_id: string; teacher_id: string }[];
}

export interface PostClassroomTeacherInterface {
    step: number;
    subject_teachers: { class_subject_id: string; teacher_id: string }[];
    is_update: boolean;
}

export interface PostClassroomTeacherStepResponse {
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
