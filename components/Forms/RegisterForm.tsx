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

const RegisterForm = ({
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
    shouldFocusError: true,
  } as any);

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  // Advance to next step after validating only current step's fields

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
            <h2 className="font-display text-3xl text-charcoal font-semibold">
              Cadastro
            </h2>
          </div>
        </div>

        {/* Single form wraps all steps — FormProvider shares context to sub-components */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit, (errs) => console.log(errs))}
            noValidate
          >
            <div className="bg-white border border-charcoal/8 p-8 space-y-6">
              <StepPersonal />
              <StepAddresses />
              <StepCards />
              {/* <StepReview data={watch()} /> */}

              <div className="pt-5 border-t border-charcoal/6">
                <PrimaryBtn type="submit">Criar Conta ✓</PrimaryBtn>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default RegisterForm;
