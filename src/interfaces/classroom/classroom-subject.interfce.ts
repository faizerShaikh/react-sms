export interface ClassroomSubjectInterface {
    class_subjects: string[];
}

export interface PostClassroomSubjectInterface {
    step: number;
    class_subjects: string[];
    is_update: boolean;
}

export interface PostClassroomSubjectStepResponse {
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
