import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { SetURLSearchParams } from "react-router-dom";
//import { TFunction } from "i18next";

export interface IData {
  birthday: string | number;
  city: string | number;
  code: string | number;
  user_image: any;
  code_expired_date: string | number;
  code_source: string | number;
  code_usage: string | number;
  country: string | number;
  created_at: string | number;
  created_from: string | number;
  email: string | number;
  email_verified_at: string | number | null;
  first_name: string | number;
  gender: string | number;
  id: string | number;
  last_name: string | number;
  phone: string | number;
  region: string | number;
  updated_at: string | number;
  verified: string | number;
}

export interface IUserData {
  token: string;
  id: number;
  data: IData;
}
export interface IFormElementProps<T extends FieldValues> {
  register: UseFormRegister<T> | any;
  name: Path<T> | any;
  placeholder: string;
  t: TFunction | any;
  //! index signature
  errors?: FieldErrors;
  dirtyFields?: { [index: string]: boolean };
  required?: true | false;
  validations?: object;
  dir?: "rtl" | "ltr";
  Bgcolor?: "light" | "dark";
  label?: string;
  alignment?: "vertical" | "horizontal";
  disabled?: true | false;
  ServerErrors?: string | any;
  inputStyle?: string;
  value?: string | number;
  rows?: number;
  withIcon?: true | false;
  icon?: string;
  getValues?: UseFormGetValues<T>;
  confirmName?: string;
  confirmName2?: string;
  className?: string;
  watch?: UseFormWatch<T>;
  btnText?: string;
  serverFileSrc?: string;
  fileFor?: string;
  setValue?: UseFormSetValue<T>;
  color?: string;
  confirmFor: any;
}

export interface IComboBoxProps<T extends FieldValues = any> {
  color?: string;
  data?: { id: string | number; title: string }[];
  placeholder?: string;
  setValue?: UseFormSetValue<T> | any;
  stateName?: string;
  width?: string;

  setSearchParams?: SetURLSearchParams;
  searchParams?: URLSearchParams;
  light?: true | false;
  NotFoundMessage?: string;
  getDefaultValueFromURL?: string;
  selectBox?: true | false;
  isSuccess?: true | false;
  callBcFn?: (value: string | number) => void;
}

export interface IHeadingsProps {
  color?: {
    basic_color?: string;
    secondary_color?: string;
    temp_color?: string;
  };
  children: React.ReactNode | string | any;
  className?: string;
  colored?: true | false;
  textcolor?: string;
}

export type TFunction = (name: string, options?: object) => string;
export type SetValueType = (name: string, value: string | number) => void;
export type PasswordType = string | number;
