export interface ParentInterface {
  name: string;
  educational_qualification: string;
  occupation: string;
  designation: string;
  phone_number: string;
  alternate_phone_number?: string;
  email: string;
  annual_income: number;
}

export interface OtherDetailInterface {
  address: string;
  permanent_address: string;
}

export interface ParentsInfoInterface {
  mother: ParentInterface;
  father: ParentInterface;
  other_detail: OtherDetailInterface;
}
