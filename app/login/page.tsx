"use client";
import LoginForm from "@/components/Forms/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import api from "@/services/api/api";
import { LoginData } from "@/types/mock.interface";
import { localStorageKeys } from "@/utils/localStorageKeys";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { setUser } = useAuth();
  const handleLoginUser = async (form: LoginData) => {
    try {
      setIsSubmitting(true);
      const { data } = await api.post("/login", {
        email: form.email,
        password: form.senha,
      });
      setUser(data.user);
      localStorage.setItem(localStorageKeys.accessToken, data.token);
      localStorage.setItem(localStorageKeys.user, JSON.stringify(data.user));
      router.push("/profile");
    } catch (error) {
      showSnackbar("Email ou senha incorretos.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <LoginForm
      onSuccess={(user) => {
        handleLoginUser(user);
      }}
      onRegister={() => {
        router.push("/register");
      }}
      onBack={() => {
        router.back();
      }}
      isSubmitting={isSubmitting}
    />
  );
}
