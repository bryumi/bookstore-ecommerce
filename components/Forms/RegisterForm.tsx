import { FormProvider, useForm } from "react-hook-form";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import StepAddresses from "./StepAddress";
import StepCards from "./StepCards";
import StepPersonal from "./StepPersonal";
import StepReview from "./StepReview";
import { registerSchema, RegisterStep } from "@/validations/RegisterSchema";
import { UserData } from "@/types/mock.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { emptyUser } from "@/utils/mask";

const stepValidationFields: Record<RegisterStep, (keyof UserData)[]> = {
  personal: [
    "nome",
    "email",
    "senha",
    "cpf",
    "dataNascimento",
    "telefone",
    "genero",
  ],
  addresses: ["enderecos"],
  cards: ["cartoes"],
  review: [],
};
const steps: { key: RegisterStep; label: string }[] = [
  { key: "personal", label: "Dados Pessoais" },
  { key: "addresses", label: "Endereços" },
  { key: "cards", label: "Cartões" },
  { key: "review", label: "Revisão" },
];
const RegisterForm = ({
  stepIndex,
  registerStep,
  setRegisterStep,
  onBack,
  onSuccess,
}: {
  stepIndex: number;
  registerStep: RegisterStep;
  setRegisterStep: (s: RegisterStep) => void;
  onBack: () => void;
  onSuccess: (user: UserData) => void;
}) => {
  const methods = useForm<UserData>({
    resolver: yupResolver(registerSchema),
    defaultValues: emptyUser(),
    // Validate only on submit/blur, not on every keystroke
    mode: "onTouched",
  } as any);

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { isSubmitting },
  } = methods;

  // Advance to next step after validating only current step's fields
  const handleNext = async () => {
    const fields = stepValidationFields[registerStep];
    const valid = await trigger(fields as any);
    if (valid) setRegisterStep(steps[stepIndex + 1].key);
  };

  const onSubmit = (data: UserData) => onSuccess(data);

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-10">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/30 hover:text-charcoal mb-3 transition-colors"
            >
              ← Voltar
            </button>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-1">
              Novo Cadastro
            </p>
            <h2 className="font-display text-3xl text-charcoal font-semibold">
              {steps[stepIndex].label}
            </h2>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-1.5 mt-1">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-1.5">
                <div
                  className={`w-6 h-6 flex items-center justify-center font-sans text-[10px] font-bold transition-all duration-200
                  ${i === stepIndex ? "bg-charcoal text-cream" : i < stepIndex ? "bg-sage text-white" : "border border-charcoal/15 text-charcoal/25"}`}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-4 h-px ${i < stepIndex ? "bg-sage" : "bg-charcoal/10"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Single form wraps all steps — FormProvider shares context to sub-components */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="bg-white border border-charcoal/8 p-8 space-y-6">
              {registerStep === "personal" && <StepPersonal />}
              {registerStep === "addresses" && <StepAddresses />}
              {registerStep === "cards" && <StepCards />}
              {registerStep === "review" && <StepReview data={watch()} />}

              <div className="pt-5 border-t border-charcoal/6">
                {stepIndex < steps.length - 1 ? (
                  <PrimaryBtn onClick={handleNext}>Continuar →</PrimaryBtn>
                ) : (
                  <PrimaryBtn type="submit">Criar Conta ✓</PrimaryBtn>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default RegisterForm;
