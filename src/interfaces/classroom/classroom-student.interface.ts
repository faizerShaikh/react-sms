export interface PostClassroomStudentInterface {
    step: number;
    students: string[];
    is_update: boolean;
}

export interface PostClassroomStudentStepResponse {
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
