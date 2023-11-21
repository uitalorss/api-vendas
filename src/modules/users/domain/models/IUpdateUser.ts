export interface IUpdateUser {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}
