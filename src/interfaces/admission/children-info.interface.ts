export interface ChildrenInfoInterface {
    aadhaar_number: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    place_of_birth: string;
    mother_tongue: string;
    caste: string;
    sub_caste: any;
    is_foreigner: boolean;
    transport_facility_required: boolean;
}

export interface PostChildrenInfoInterface {
    step: number;
    standard: string;
    academic_year: string;
    batch: string;
    student: string;
    admission: string;
    phone: string;
    student_data: ChildrenInfoInterface;
    is_update: boolean;
}

export interface PostAdmissionStepResponse {
    admission: string;
    student: string;
    form_number: string;
    currentStep: number;
    declaration_agreed?: boolean;
}
