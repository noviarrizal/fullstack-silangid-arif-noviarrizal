/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectHomeState, setDataUser, setLoading } from "../homeSlice";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { userRequest } from "@/lib/api/homeService";

export const useInitHooks = () => {
  const dispatch = useAppDispatch();
  const { isLoading, userList } = useAppSelector(selectHomeState);

  const getListUser = useMutation({
    mutationFn: userRequest,
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: (data) => {
      dispatch(setLoading(false));
      dispatch(setDataUser(data.users))
      console.log(data, "data");
    },
    onError: (error: any) => {
      toast.error(error.errors.email);
    },
  });

  return {
    getListUser,
    isLoading,
    userList
  }
};
