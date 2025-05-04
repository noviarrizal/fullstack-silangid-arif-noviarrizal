import { api } from "@/lib/utils";
import {
  EditUserPayload,
  SaveUserPayload,
  SaveUserResponse,
  UserDetailResponse,
  UserListResponse,
} from "./homeServiceResponse";

export const userRequest = async () => {
  const response = await api.get<UserListResponse>("/users");
  return response.data;
};

export const userRequestDetail = async (id: string) => {
  const response = await api.get<UserDetailResponse>(`/users/${id}`);
  return response.data;
};

export const saveUserRequest = async (
  payload: SaveUserPayload
): Promise<SaveUserResponse> => {
  const response = await api.post("/users", payload);
  return response.data;
};

export const editUserRequest = async (id: string, payload: EditUserPayload) => {
  const response = await api.put(`/users/${id}`, payload);
  return response.data;
};

export const deleteUserRequest = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
