export interface User {
  emailUser: string;
  roleUser: UserRole;
  token: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
