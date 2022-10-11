export enum AccountFormTypes {
  Login = "LOGIN",
  Register = "REGISTER",
}

export interface ApiErrorType {
  error: string;
  message?: string;
}

export interface RegistrationType {
  email: string;
  password: string;
  organizationName: string;
  firstName: string;
  lastName: string;
}
