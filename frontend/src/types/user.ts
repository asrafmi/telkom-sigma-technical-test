export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  fullname: string;
  role: string;
  token?: string;
}
