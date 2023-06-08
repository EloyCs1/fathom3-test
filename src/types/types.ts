import { GridSize } from "@mui/material";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";

export interface UserState {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface CarFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Car) => void;
  defaultValue?: Car;
}

export interface InputFormProps {
  xs: boolean | GridSize | undefined;
  name: keyof Car;
  type?: React.HTMLInputTypeAttribute | undefined;
  label: React.ReactNode;
  register: UseFormRegister<Car>;
  errors: FieldErrors<Car>;
}

export interface SelectFormProps {
  xs: boolean | GridSize | undefined;
  name: keyof Car;
  label: React.ReactNode;
  control: Control<Car, any>;
  data: Types | undefined;
  register: UseFormRegister<Car>;
  errors: FieldErrors<Car>;
}

export interface CheckboxFormProps {
  name: keyof Car;
  control: Control<Car, any>;
  register: UseFormRegister<Car>;
}

export interface Car {
  id: number | null;
  favorite: boolean;
  make: string;
  model: string;
  drive: string;
  fuel: string;
  year: number | null;
  trany: string;
  gears: number | null;
}

interface LiteralType {
  value: string;
  label: string;
}

export interface Types {
  [key: string]: LiteralType[];
}
