export interface UserState {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

export interface Car {
  id: number;
  favorite: boolean;
  make: string;
  model: string;
  drive: string;
  fuel: string;
  year: number;
  trany: string;
  gears: number;
}

interface LiteralType {
  value: string;
  label: string;
}

export interface Types {
  [key: string]: LiteralType[];
}
