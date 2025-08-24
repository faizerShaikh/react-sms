import { SchoolConfigCollection } from "@/interfaces";

const config: SchoolConfigCollection = {
  "oakridge-school": {
    school_name: "The Oakridge International School",
    school_location: "Pune",
    school_logo_path: "/apps/oakridge-school/logo.png",
    bank_details: {
      payment_qr_code: "/apps/oakridge-school/payment-qr-code.png",
      bank_name: "ICICI BANK",
      account_name: "Global Educational and Welfare Society",
      account_number: "007405008117",
      ifsc_code: "ICIC0000074",
      branch_name: "KONDHWA BUDRUK",
    },
    admission_form_fees: 200,
    online_payment_enabled: false,
    theme: {
      "primary": "#004ab0",
      "primary-light": "#edf5ff",
      "primary-dark": "#002558",
      "heading-text": "#212226",
      "background": "#ffffff",
    },
    formats: {
      "date-input-format": "dd/mm/yy",
      "time-input-format": "12",
      "date-format": "d MMM' y",
      "time-format": "h:mm a",
      "date-time-format": "d MMM' y, h:mm a",
    },
    config: {
      FORM_IN_BLOCK_LETTERS: true,
    },
    envs: {
      test: {
        API_URL: "https://gledws.in:9000/api",
        MEDIA_FOLDER_URL: "https://gledws.in:9000",
      },
      prod: {
        API_URL: "https://gledws.in:8000/api",
        MEDIA_FOLDER_URL: "https://gledws.in:8000",
      },
    },
  },
  "default": {
    school_name: "Quartoloom School",
    school_location: "PUNE",
    school_logo_path: "/apps/default/logo.png",
    admission_form_fees: 200,
    online_payment_enabled: true,
    theme: {
      "primary": "#004ab0",
      "primary-light": "#edf5ff",
      "primary-dark": "#002558",
      "heading-text": "#212226",
      "background": "#ffffff",
    },
    formats: {
      "date-input-format": "dd/mm/yy",
      "time-input-format": "12",
      "date-format": "d MMM' y",
      "time-format": "h:mm a",
      "date-time-format": "d MMM' y, h:mm a",
    },
    config: {
      FORM_IN_BLOCK_LETTERS: true,
    },
    envs: {
      test: {
        API_URL: "https://quartoloom.com:8000/api",
        MEDIA_FOLDER_URL: "https://quartoloom.com:8000",
      },
      prod: {
        API_URL: "https://quartoloom.com:8000/api",
        MEDIA_FOLDER_URL: "https://quartoloom.com:8000",
      },
    },
  },
};

export default config;
