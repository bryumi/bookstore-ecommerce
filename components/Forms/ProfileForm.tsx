import { UserData } from "@/types/mock.interface";
import {
  profileAddressesSchema,
  profileCardsSchema,
  profilePersonalSchema,
} from "@/validations/RegisterSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../Input";
import { formatCPF, formatPhone } from "@/utils/mask";
import Select from "../Select";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import AutoSaveNote from "../AutoSaveNote";
import StepAddresses from "./StepAddress";
import StepCards from "./StepCards";
import { useStore } from "@/lib/store-context";
import { useRouter } from "next/navigation";

const ProfileForm = ({
  loggedUser,
  editSection,
  setEditSection,
  onSave,
  onLogout,
  isPageProfile = false,
  onCheckout,
}: {
  loggedUser: UserData;
  editSection: "personal" | "addresses" | "cards" | null;
  setEditSection: (s: "personal" | "addresses" | "cards" | null) => void;
  onSave: (user: UserData) => void;
  onLogout: () => void;
  isPageProfile?: boolean;
  onCheckout?: () => void;
}) => {
  const router = useRouter();
  const { clearCart } = useStore();

  const personalMethods = useForm<UserData>({
    resolver: yupResolver(profilePersonalSchema as any),
    defaultValues: loggedUser,
    mode: "onTouched",
  });

  const addressMethods = useForm<Pick<UserData, "enderecos">>({
    resolver: yupResolver(profileAddressesSchema as any),
    defaultValues: { enderecos: loggedUser.enderecos },
    mode: "onTouched",
  });

  const cardMethods = useForm<Pick<UserData, "cartoes">>({
    resolver: yupResolver(profileCardsSchema as any),
    defaultValues: { cartoes: loggedUser.cartoes },
    mode: "onTouched",
  });

  const handleSavePersonal = personalMethods.handleSubmit((data) => {
    onSave({ ...loggedUser, ...data });
  });

  const handleSaveAddresses = addressMethods.handleSubmit((data) => {
    onSave({ ...loggedUser, enderecos: data.enderecos });
  });

  const handleSaveCards = cardMethods.handleSubmit((data) => {
    onSave({ ...loggedUser, cartoes: data.cartoes });
  });

  const handleConfirmPurchase = () => {
    console.log("confirm purchase");
    if (onCheckout) onCheckout();
  };
  const sections = [
    {
      key: "personal" as const,
      label: "Dados Pessoais",
      sub: loggedUser.email,
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
      sub: `${loggedUser.enderecos.length} endereço(s)`,
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
      sub: `${loggedUser.cartoes.length} cartão(ões)`,
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
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-1">
              Minha Conta
            </p>
            <h2 className="font-display text-3xl text-charcoal font-semibold">
              Olá, {loggedUser.nome.split(" ")[0]}
            </h2>
          </div>
          <button
            onClick={onLogout}
            className="font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/30 border border-charcoal/12 px-4 py-2 hover:border-burgundy/30 hover:text-burgundy transition-all duration-200 mb-1"
          >
            Sair
          </button>
        </div>

        <div className="h-px bg-gradient-to-r from-gold/25 via-gold/8 to-transparent mb-8" />

        <div className="space-y-2">
          {sections.map(({ key, label, sub, dot, icon }) => (
            <div key={key} className="bg-white border border-charcoal/8">
              <button
                type="button"
                onClick={() => setEditSection(editSection === key ? null : key)}
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
                  ${editSection === key ? "text-charcoal/25" : "text-burgundy group-hover:text-burgundy/60"}`}
                >
                  {editSection === key ? "Fechar" : "Editar"}
                </span>
              </button>

              {editSection === key && (
                <div className="px-6 pb-6 pt-5 border-t border-charcoal/5 space-y-4">
                  {key === "personal" && (
                    <FormProvider {...personalMethods}>
                      <form
                        onSubmit={handleSavePersonal}
                        noValidate
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Input
                              label="Nome Completo"
                              registration={personalMethods.register("nome")}
                              error={
                                personalMethods.formState.errors.nome?.message
                              }
                            />
                          </div>
                          <Input
                            label="E-mail"
                            type="email"
                            registration={personalMethods.register("email")}
                            error={
                              personalMethods.formState.errors.email?.message
                            }
                          />
                          <Input
                            label="Nova Senha"
                            type="password"
                            hint="Deixe vazio para não alterar"
                            registration={personalMethods.register("senha")}
                            error={
                              personalMethods.formState.errors.senha?.message
                            }
                          />
                          <Input
                            label="CPF"
                            placeholder="000.000.000-00"
                            registration={personalMethods.register("cpf")}
                            transform={formatCPF}
                            error={
                              personalMethods.formState.errors.cpf?.message
                            }
                          />
                          <Input
                            label="Telefone"
                            registration={personalMethods.register("telefone")}
                            transform={formatPhone}
                            error={
                              personalMethods.formState.errors.telefone?.message
                            }
                          />
                          <Input
                            label="Data de Nascimento"
                            type="date"
                            registration={personalMethods.register(
                              "dataNascimento",
                            )}
                            error={
                              personalMethods.formState.errors.dataNascimento
                                ?.message
                            }
                          />
                          <Select
                            label="Gênero"
                            registration={personalMethods.register("genero")}
                            error={
                              personalMethods.formState.errors.genero?.message
                            }
                            options={[
                              { value: "masculino", label: "Masculino" },
                              { value: "feminino", label: "Feminino" },
                              { value: "outro", label: "Outro" },
                              {
                                value: "nao-informar",
                                label: "Prefiro não informar",
                              },
                            ]}
                          />
                        </div>
                        <PrimaryBtn type="submit">Salvar alterações</PrimaryBtn>
                        <AutoSaveNote />
                      </form>
                    </FormProvider>
                  )}

                  {key === "addresses" && (
                    <FormProvider {...addressMethods}>
                      <form
                        onSubmit={handleSaveAddresses}
                        noValidate
                        className="space-y-4"
                      >
                        <StepAddresses />
                        <PrimaryBtn type="submit">Salvar endereços</PrimaryBtn>
                        <AutoSaveNote />
                      </form>
                    </FormProvider>
                  )}

                  {key === "cards" && (
                    <FormProvider {...cardMethods}>
                      <form
                        onSubmit={handleSaveCards}
                        noValidate
                        className="space-y-4"
                      >
                        <StepCards />
                        <PrimaryBtn type="submit">Salvar cartões</PrimaryBtn>
                        <AutoSaveNote />
                      </form>
                    </FormProvider>
                  )}
                </div>
              )}
            </div>
          ))}
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
  );
};

export default ProfileForm;
