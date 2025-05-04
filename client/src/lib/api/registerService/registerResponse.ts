export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface IRegisterResponse {
  status: boolean;
  token: string;
  user: IUser;
  message: string;
}
