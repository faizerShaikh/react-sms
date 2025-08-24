export interface SchoolConfigInterface {
    school_name: string;
    school_logo_path: string;
    school_location: string;
    admission_form_fees: number;
    online_payment_enabled: boolean;
    bank_details?: {
        payment_qr_code: string;
        bank_name: string;
        account_name: string;
        account_number: string;
        ifsc_code: string;
        branch_name: string;
    };
    theme: {
        primary: string;
        "primary-light": string;
        "primary-dark": string;
        "heading-text": string;
        background: string;
    };
    formats: {
        "date-input-format": string;
        "time-input-format": string;
        "date-format": string;
        "time-format": string;
        "date-time-format": string;
    };
    config: {
        FORM_IN_BLOCK_LETTERS: boolean;
    };
    envs: {
        test: {
            API_URL: string;
            MEDIA_FOLDER_URL: string;
        };
        prod: {
            API_URL: string;
            MEDIA_FOLDER_URL: string;
        };
    };
}

export interface SchoolConfigCollection {
    [key: string]: SchoolConfigInterface;
}
