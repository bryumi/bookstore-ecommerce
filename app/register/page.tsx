"use client";

import RegisterForm from "@/components/Forms/RegisterForm";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useCreateClient } from "@/services/clients/createClient";
import { UserData } from "@/types/mock.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const { showSnackbar } = useSnackbar();
  const stepIndex = steps.findIndex((s) => s.key === registerStep);
  // useEffect(() => {
  //   const stored = localStorage.getItem("bookstore-user");
  //   if (stored && stored !== "null") {
  //     setLoggedUser(JSON.parse(stored));
  //   }
  // }, []);
  const { mutate: mutateCreateUser } = useCreateClient({
    onSuccess: () => {
      showSnackbar("Salvo com sucesso!", "success");
      router.push("/profile");
    },
    onError: (error) => {
      showSnackbar("Erro ao salvar!", "error");
      console.log(error);
    },
  });
  const saveUser = (user: UserData) => {
    // localStorage.setItem("bookstore-user", JSON.stringify(user));
    // setLoggedUser(user);
    mutateCreateUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("bookstore-user");
    // setLoggedUser(null);
  };


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
        console.log("user", user);
        saveUser(user);
<<<<<<< HEAD
        router.push("/login");
=======
>>>>>>> 6d69e4a4f6d4acbe06b436ff2803f13158b13047
      }}
    />
  );
}
