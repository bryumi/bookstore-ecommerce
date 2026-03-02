import { LoginData, UserData } from "@/types/mock.interface";
import PrimaryBtn from "../Buttons/PrimaryBtn";
import Input from "../Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/validations/RegisterSchema";
import { useForm } from "react-hook-form";

const LoginForm = ({
  onSuccess,
  onRegister,
  onBack,
}: {
  onSuccess: (user: UserData) => void;
  onRegister: () => void;
  onBack: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    const stored = localStorage.getItem("bookstore-user");
    if (stored) {
      const user: UserData = JSON.parse(stored);
      if (user.email === data.email && user.senha === data.senha) {
        onSuccess(user);
        return;
      }
    }
    alert("Email ou senha incorretos.");
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="w-1/2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-sans text-base uppercase tracking-[0.2em] text-charcoal hover:text-charcoal mb-10 transition-colors"
        >
          ← Voltar
        </button>
        <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-2">
          Acesso
        </p>
        <h2 className="font-display text-3xl text-charcoal font-semibold mb-1">
          Entrar
        </h2>
        <p className="font-body text-sm italic text-charcoal mb-8">
          Acesse sua conta para continuar
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <Input
            label="E-mail"
            type="email"
            required
            registration={register("email")}
            error={errors.email?.message}
          />
          <Input
            label="Senha"
            type="password"
            required
            registration={register("senha")}
            error={errors.senha?.message}
          />
          <div className="pt-2">
            <PrimaryBtn type="submit">Entrar →</PrimaryBtn>
          </div>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-charcoal/8" />
          <span className="font-sans text-sm uppercase tracking-[0.2em] text-charcoal">
            ou
          </span>
          <div className="flex-1 h-px bg-charcoal/8" />
        </div>

        <p className="text-center font-body text-sm text-charcoal/40">
          Não tem conta?{" "}
          <button
            onClick={onRegister}
            className="text-burgundy hover:text-burgundy/70 font-medium transition-colors"
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
