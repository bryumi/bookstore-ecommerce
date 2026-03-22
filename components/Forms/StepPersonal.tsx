import { UserData } from "@/types/mock.interface";
import { useFormContext } from "react-hook-form";
import SectionTitle from "../SectionTitle";
import Input from "../Input";
import { formatPhone, maskCPF } from "@/utils/mask";
import Select from "../Select";

const StepPersonal = ({
  formMode = "register",
}: {
  formMode?: "edit" | "register";
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserData>();
  const e = errors;

  return (
    <>
      <SectionTitle>Dados Pessoais</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Input
            label="Nome Completo"
            required
            registration={register("nome")}
            error={e.nome?.message}
          />
        </div>
        <Input
          label="E-mail"
          type="email"
          required
          registration={register("email")}
          error={e.email?.message}
        />
        {formMode === "register" && (
          <Input
            label="Senha"
            type="password"
            required
            hint="Mín. 8 caracteres, 1 maiúscula, 1 número"
            registration={register("senha")}
            error={e.senha?.message}
          />
        )}
        {formMode === "register" && (
          <Input
            label="Confirmar Senha"
            type="password"
            required
            registration={register("confirmarSenha")}
            error={e.confirmarSenha?.message}
          />
        )}
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          required
          registration={register("cpf")}
          transform={maskCPF}
          error={e.cpf?.message}
        />
        <Input
          label="Tipo de Telefone"
          placeholder="residencial, comercial, celular"
          required
          registration={register("tipoTelefone")}
          error={e.tipoTelefone?.message}
        />
        <Input
          label="Telefone"
          placeholder="(00) 00000-0000"
          required
          registration={register("telefone")}
          transform={formatPhone}
          error={e.telefone?.message}
        />
        <Input
          label="Data de Nascimento"
          type="date"
          required
          registration={register("dataNascimento")}
          error={e.dataNascimento?.message}
        />
        <Select
          label="Gênero"
          required
          registration={register("genero")}
          error={e.genero?.message}
          options={[
            { value: "male", label: "Masculino" },
            { value: "female", label: "Feminino" },
            { value: "other", label: "Outro" },
          ]}
        />
      </div>
    </>
  );
};

export default StepPersonal;
