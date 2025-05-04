import { api } from "@/lib/utils";
import { IRegisterResponse } from "../registerService/registerResponse";

export const loginRequest = async (payload: { password: string, email: string }) => {
    const response = await api.post<IRegisterResponse>('/login', payload);
    return response.data;
};