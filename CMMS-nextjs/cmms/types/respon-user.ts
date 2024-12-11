export type user = {
  id: string;
  fullName: string;
  email: string;
  dob: string;
  phoneNumber: string | null;
  province: string | null;
  district: string | null;
  ward: string | null;
  address: string | null;
  taxCode: string | null;
  note: string;
  status: number;
  storeId: string | null;
};