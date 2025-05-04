export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface UserListResponse {
  status: boolean;
  message: string;
  pagination: Pagination;
  users: User[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserDetailResponse {
  status: boolean;
  user?: IUser;
  message?: string;
}

export interface EditUserPayload {
  name: string;
  email: string;
}

export interface SaveUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface SaveUserResponse {
  status: boolean;
  user: User;
  message: string;
}
