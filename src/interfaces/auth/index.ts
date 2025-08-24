export * from "./admin-login.interface";
export * from "./auth-store.interface";
export * from "./student-login.interface";

export interface RequestForgotPasswordOTPInterface {
    user_type: string;
    id: string;
}

export interface ForgotPasswordOTPResponseInterface {
    token: string;
    otp_expiry: string;
    user_info: {
        emails: string[];
        user_type: string;
        employee_or_admission_id: string;
    };
}

export interface VerifyOTPInterface {
    token: string;
    otp: string;
}

export interface UpdatePasswordInterface {
    token: string;
    password: string;
}
