"use client";
import LoginForm from "@/components/Forms/LoginForm";
import { useStore } from "@/lib/store-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { setLoggedUser } = useStore();
  return (
    <LoginForm
      onSuccess={(user) => {
        setLoggedUser(user);
        router.push("/profile");
      }}
      onRegister={() => {
        router.push("/register");
      }}
      onBack={() => {
        router.back();
      }}
    />
  );
}
