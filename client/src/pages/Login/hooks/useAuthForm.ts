/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import { selectLoginState, setDataUser, setLoading, setSubmitting } from "../loginSlice";
import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "@/lib/api/registerService";
import { toast } from "sonner";
import { loginRequest } from "@/lib/api/loginService";
import { useNavigate } from "react-router-dom";

export const useAuthForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const { isSubmitting, isLoading } = useAppSelector(selectLoginState);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const mutationLogin = useMutation({
    mutationFn: loginRequest,
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setSubmitting(true));
    },
    onSuccess: (data) => {
      dispatch(setLoading(false));
      dispatch(setSubmitting(false));
      dispatch(setDataUser(data.user));
      sessionStorage.setItem("authToken", data.token);
      toast.success(data.message);
      navigate('/home')
    },
    onError: (error: any) => {
      dispatch(setSubmitting(false));
      toast.error(error.errors.email);
    },
  });

  const mutationRegister = useMutation({
    mutationFn: registerRequest,
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setSubmitting(true));
    },
    onSuccess: (data) => {
      dispatch(setLoading(false));
      dispatch(setSubmitting(false));
      sessionStorage.setItem("authToken", data.token);
      toast.success(data.message);
    },
    onError: (error: any) => {
      dispatch(setSubmitting(false));
      toast.error(error.errors.email);
    },
  });

  const handleLogin = (values: z.infer<typeof loginSchema>) => {
    mutationLogin.mutate({
      email: values.email,
      password: values.password,
    });
  };

  const handleRegister = (values: z.infer<typeof registerSchema>) => {
    mutationRegister.mutate({
      email: values.email,
      password: values.password,
      name: values.name,
    });
  };

  return {
    showPassword,
    showRegisterPassword,
    togglePasswordVisibility: () => setShowPassword((prev) => !prev),
    toggleRegisterPasswordVisibility: () =>
      setShowRegisterPassword((prev) => !prev),
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    isSubmitting,
    isLoading,
    mutationRegister,
  };
};
