export interface StudentLoginInterface {
    adm_number: string;
    password: string;
}

export interface TeacherLoginInterface {
    employee_id: string;
    password: string;
}

export interface StudentDataInterface {
    token: string;
    admission_id: string;
    is_id_card_filled: boolean;
    is_document_added: boolean;
    name: string;
    standard: string;
    student_id: string;
    photo: string;
    admissionNumber: string;
}
