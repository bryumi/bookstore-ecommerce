"use client";

import RegisterForm from "@/components/Forms/RegisterForm";
import { useStore } from "@/lib/store-context";
import { UserData } from "@/types/mock.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type RegisterStep = "personal" | "addresses" | "cards" | "review";

const steps: { key: RegisterStep; label: string }[] = [
  { key: "personal", label: "Dados Pessoais" },
  { key: "addresses", label: "Endereços" },
  { key: "cards", label: "Cartões" },
  { key: "review", label: "Revisão" },
];

export default function RegisterPage() {
  const [registerStep, setRegisterStep] = useState<RegisterStep>("personal");
  const router = useRouter();
  const stepIndex = steps.findIndex((s) => s.key === registerStep);
  const { setLoggedUser } = useStore();
  useEffect(() => {
    const stored = localStorage.getItem("bookstore-user");
    if (stored && stored !== "null") {
      setLoggedUser(JSON.parse(stored));
    }
  }, []);

  const saveUser = (user: UserData) => {
    localStorage.setItem("bookstore-user", JSON.stringify(user));
    setLoggedUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("bookstore-user");
    setLoggedUser(null);
  };

  // ── Choose ──────────────────────────────────────────────────────────────────

  return (
    <RegisterForm
      stepIndex={stepIndex}
      registerStep={registerStep}
      setRegisterStep={setRegisterStep}
      onBack={() =>
        stepIndex === 0
          ? router.back()
          : setRegisterStep(steps[stepIndex - 1].key)
      }
      onSuccess={(user) => {
        saveUser(user);
        router.push("/profile");
      }}
    />
  );
}
