import { UserData } from "@/types/mock.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import StepAddresses from "./StepAddress";
import StepCards from "./StepCards";

import StepPersonal from "./StepPersonal";
import { registerSchema } from "@/validations/RegisterSchema";
import { useState } from "react";
import ModalChangePassword from "../Modals/ModalChangePassword";

const ProfileForm = ({
  loggedUser,
  editSection,
  setEditSection,
  onSave,
  onLogout,
  isPageProfile = false,
  onCheckout,
  onSuccess,
}: {
  loggedUser?: UserData;
  editSection: "personal" | "addresses" | "cards" | null;
  setEditSection: (s: "personal" | "addresses" | "cards" | null) => void;
  onSave: (user: UserData) => void;
  onLogout: () => void;
  isPageProfile?: boolean;
  onCheckout?: () => void;
  onSuccess?: (user: UserData) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [modalChangePassword, setModalChangePassword] = useState(false);
  const methods = useForm<UserData>({
    resolver: yupResolver(registerSchema),
    defaultValues: loggedUser,
    // Validate only on submit/blur, not on every keystroke
    mode: "onTouched",
    shouldFocusError: true,
  } as any);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const handleConfirmPurchase = () => {
    console.log("confirm purchase");
    if (onCheckout) onCheckout();
  };

  const onSubmit = (data: UserData) => {
    if (onSuccess) onSuccess(data);
  };
  const sections = [
    {
      key: "personal" as const,
      label: "Dados Pessoais",
      sub: loggedUser?.email,
      dot: "bg-burgundy/15 text-burgundy",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      key: "addresses" as const,
      label: "Endereços",
      sub: `${loggedUser?.enderecos.length} endereço(s)`,
      dot: "bg-sage/15 text-sage",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      key: "cards" as const,
      label: "Cartões de Pagamento",
      sub: `${loggedUser?.cartoes.length} cartão(ões)`,
      dot: "bg-gold/15 text-gold",
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-cream p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-1">
                Minha Conta
              </p>
              <h2 className="font-display text-3xl text-charcoal font-semibold">
                Olá, {loggedUser?.nome?.split(" ")[0]}
              </h2>
            </div>
            <div className="flex items-end gap-4">
              <button
                onClick={onLogout}
                className="font-sans text-[10px] uppercase tracking-[0.15em]  text-charcoal/30 border border-charcoal/12 px-4 py-2 hover:border-burgundy/30 hover:text-burgundy transition-all duration-200 mb-1"
              >
                Sair
              </button>
              <button
                onClick={() => setModalChangePassword(true)}
                className="font-sans text-[10px] uppercase tracking-[0.15em] bg-burgundy text-yellow-50 border border-charcoal/12 px-4 py-2 hover:border-burgundy/30  hover:bg-burgundy/80 transition-all duration-200 mb-1"
              >
                Alterar senha
              </button>
            </div>
          </div>

          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
              className="font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/30 border border-charcoal/12 px-4 py-2 hover:border-burgundy/30 hover:text-burgundy transition-all duration-200 mb-1"
            >
              Cancelar
            </button>
          ) : (
            <div className="h-px bg-gradient-to-r from-gold/25 via-gold/8 to-transparent mb-8" />
          )}

          <div className="space-y-2">
            {!isEdit &&
              sections.map(({ key, label, sub, dot, icon }) => (
                <div key={key} className="bg-white border border-charcoal/8">
                  <button
                    type="button"
                    onClick={() =>
                      setEditSection(editSection === key ? null : key)
                    }
                    className="w-full flex items-center justify-between px-6 py-5 hover:bg-charcoal/2 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 flex items-center justify-center ${dot}`}
                      >
                        {icon}
                      </div>
                      <div className="text-left">
                        <p className="font-sans text-sm font-semibold text-charcoal">
                          {label}
                        </p>
                        <p className="font-body text-xs italic text-charcoal/35">
                          {sub}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-sans text-[10px] uppercase tracking-[0.15em] transition-colors
                  ${!isEdit ? "text-charcoal/25" : "text-burgundy group-hover:text-burgundy/60"}`}
                      onClick={() => setIsEdit(!isEdit)}
                    >
                      Editar
                    </span>
                  </button>
                </div>
              ))}
            {isEdit && (
              <div className="px-6 pb-6 pt-5 border-none">
                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onSubmit, (errs) =>
                      console.log(errs),
                    )}
                    noValidate
                  >
                    <div className="bg-white border border-charcoal/8 p-8 space-y-6">
                      <StepPersonal />
                      <StepAddresses />
                      <StepCards />
                      {/* <StepReview data={watch()} /> */}

                      <div className="pt-5 border-t border-charcoal/6">
                        <PrimaryBtn type="submit">Salvar ✓</PrimaryBtn>
                      </div>
                    </div>
                  </form>
                </FormProvider>
              </div>
            )}
          </div>

          {!isPageProfile && (
            <div className="mt-6">
              <PrimaryBtn onClick={handleConfirmPurchase}>
                Confirmar Compra →
              </PrimaryBtn>
            </div>
          )}
        </div>
      </div>
      <ModalChangePassword
        open={modalChangePassword}
        onClose={() => setModalChangePassword(false)}
        onSuccess={(data) => console.log(data)}
      />
    </>
  );
};

export default ProfileForm;
