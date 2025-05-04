/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { deleteUserRequest, editUserRequest, saveUserRequest, userRequest, userRequestDetail } from "@/lib/api/homeService";
import {
  selectUserState,
  setDataUser,
  setDataUserDetail,
  setLoading,
} from "../userSlice";
import { EditUserPayload } from "@/lib/api/homeService/homeServiceResponse";
import { useForm } from "react-hook-form";
import { editSchema, registerSchema } from "@/pages/Login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useInitHooks = () => {
  const dispatch = useAppDispatch();
  const { isLoading, userList, userDetail } = useAppSelector(selectUserState);

  const getListUser = useMutation({
    mutationFn: userRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setLoading(false));
      dispatch(setDataUser(data.users));
    },
    onError: (error: any) => {
      toast.error(error.errors.email);
    },
  });

  const createUser = useMutation({
    mutationFn: saveUserRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setLoading(false));
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.errors.email);
    },
  });

  const getUserDetail = useMutation({
    mutationFn: (id: string) => userRequestDetail(id),
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setLoading(false));
      if (data.user) {
        dispatch(setDataUserDetail(data.user));
      }
    },
    onError: (error: any) => {
      toast.error(error.errors.email);
    },
  });

  const editUserMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: EditUserPayload }) =>
      editUserRequest(id, payload),
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setLoading(false));
      toast.success(data.message || "User updated successfully");
    },
    onError: (error: any) => {
      dispatch(setLoading(false));
      toast.error(error.response?.data?.message || "Update failed");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => deleteUserRequest(id),
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setLoading(false));
      toast.success(data.message || "User deleted successfully");
    },
    onError: (error: any) => {
      dispatch(setLoading(false));
      toast.error(error.response?.data?.message || "Delete failed");
    },
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const formEdit = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      name: userDetail.name,
      email: userDetail.email,
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    createUser.mutate(data);
  }

  const onSubmitEdit = (data: z.infer<typeof editSchema>) => {
    editUserMutation.mutate({
      id: String(userDetail.id),
      payload: data,
    });
  }

  return {
    getListUser,
    isLoading,
    userList,
    getUserDetail,
    userDetail,
    editUserMutation,
    deleteUserMutation,
    createUser,
    form,
    onSubmit,
    formEdit,
    onSubmitEdit,
  };
};
