export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cel: string;
  birthdate: any;
  cep: string;
  state: string;
  city: string;
  street: string;
  number: number;
  complement: string;
  is_active?: boolean;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  cel?: string;
  birthdate?: any;
  cep?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: number;
  complement?: string;
  is_active?: boolean;
}

export interface ILoginUser {
  email: string;
  password: string;
}
