import {UserRole} from "./user.models";

export interface RegisterObject {
  emailUser: string;
  password: string;
  roleUser: UserRole;
}

export interface RegisterResponse {
  emailUser: string;
  roleUser: UserRole;
}

export interface LoginObject {
  emailUser: string;
  password: string;
}
