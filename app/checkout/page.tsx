"use client";
import GhostBtn from "@/components/Buttons/GhostBtn";
import PrimaryBtn from "@/components/Buttons/PrimaryBtn";
import OrderSummary from "@/components/CheckoutOrder";
import LoginForm from "@/components/Forms/LoginForm";
import ProfileForm from "@/components/Forms/ProfileForm";
import RegisterForm from "@/components/Forms/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useStore } from "@/lib/store-context";
import api from "@/services/api/api";
import { useCreateClient } from "@/services/clients/createClient";
import { useGetClientData } from "@/services/clients/getClientData";
import { UserData } from "@/types/mock.interface";
import { localStorageKeys } from "@/utils/localStorageKeys";
import { mapClientToUserData } from "@/utils/mappedClientToUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormMode = "choose" | "login" | "register" | "profile" | "checkout";
type RegisterStep = "personal" | "addresses" | "cards" | "review";

const steps: { key: RegisterStep; label: string }[] = [
  { key: "personal", label: "Dados Pessoais" },
  { key: "addresses", label: "Endereços" },
  { key: "cards", label: "Cartões" },
  { key: "review", label: "Revisão" },
];

export default function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<FormMode>("choose");
  const [isEdit, setIsEdit] = useState(false);
  const [userSaved, setUserSaved] = useState<UserData | undefined>(undefined);
  const router = useRouter();
  const { clearCart } = useStore();
  const { user, setUser } = useAuth();
  const { data: clientData, isLoading } = useGetClientData(user?.id ?? "");
  useEffect(() => {
    const stored = localStorage.getItem(localStorageKeys.user);
    if (stored && stored !== "null") {
      const loggedUser = clientData
        ? mapClientToUserData(clientData.client)
        : undefined;

      setUserSaved(loggedUser);
      setMode("profile");
    }
  }, [clientData]);

  const handleLogout = () => {
    localStorage.removeItem("bookstore-user");
    setMode("choose");
  };
  const { showSnackbar } = useSnackbar();
  const { mutate: mutateCreateUser } = useCreateClient({
    onSuccess: () => {
      showSnackbar("Salvo com sucesso!", "success");
      handleLoginUser();
    },
    onError: (error) => {
      showSnackbar("Erro ao salvar!", "error");
      console.log(error);
    },
  });
  const saveUser = (user: UserData) => {
    // localStorage.setItem("bookstore-user", JSON.stringify(user));
    // setLoggedUser(user);
    setUserSaved(user);
    mutateCreateUser(user);
  };
  const handleLoginUser = async () => {
    try {
      if (!userSaved) return;
      setIsSubmitting(true);
      const { data } = await api.post("/login", {
        email: userSaved.email,
        password: userSaved.senha,
      });
      setUser(data.user);
      setUserSaved(mapClientToUserData(data.user));
      localStorage.setItem(localStorageKeys.accessToken, data.token);
      localStorage.setItem(localStorageKeys.user, JSON.stringify(data.user));
      setMode("profile");
    } catch (error) {
      showSnackbar("Email ou senha incorretos.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (mode === "choose")
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 border border-gold/30 mb-6">
              <svg
                className="w-6 h-6 text-charcoal/35"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
              Identificação
            </p>
            <h2 className="font-display text-3xl text-charcoal font-semibold leading-snug">
              Para finalizar
              <br />
              sua compra
            </h2>
            <div className="w-8 h-px bg-gold/35 mx-auto mt-5" />
          </div>
          <div className="space-y-3">
            <PrimaryBtn onClick={() => setMode("login")}>
              Entrar na minha conta →
            </PrimaryBtn>
            <GhostBtn onClick={() => setMode("register")}>
              Criar nova conta
            </GhostBtn>
          </div>
          <p className="text-center font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/20 mt-8">
            🔒 Dados protegidos com criptografia
          </p>
        </div>
      </div>
    );

  if (mode === "login")
    return (
      <LoginForm
        onSuccess={(user) => {
          setMode("profile");
        }}
        onRegister={() => setMode("register")}
        onBack={() => setMode("choose")}
      />
    );

  if (mode === "register")
    return (
      <RegisterForm
        onBack={() => setMode("choose")}
        onSuccess={(user) => {
          saveUser(user);
          setMode("profile");
        }}
      />
    );

  // ── Profile ─────────────────────────────────────────────────────────────────
  if (mode === "profile")
    return (
      <ProfileForm
        loggedUser={userSaved}
        onSave={saveUser}
        onLogout={handleLogout}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        onCheckout={() => {
          setMode("checkout");
        }}
      />
    );
  if (mode === "checkout" && userSaved)
    return (
      <OrderSummary
        user={userSaved}
        onConfirm={() => {
          alert("Compra confirmada! Obrigado por comprar conosco.");
          router.push("/orders");
          clearCart();
        }}
      />
    );
  return null;
}
