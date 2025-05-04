import { api } from "@/lib/utils";
import { IRegisterPayload } from "./registerRequest";
import { IRegisterResponse } from "./registerResponse";

export const registerRequest = async (
  payload: IRegisterPayload
): Promise<IRegisterResponse> => {
  const response = await api.post<IRegisterResponse>("/register", payload);
  return response.data;
};
