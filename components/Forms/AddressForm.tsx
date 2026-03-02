import { Address, UserData } from "@/types/mock.interface";
import Input from "../Input";
import Select from "../Select";
import Toggle from "../Toogle";
import { Controller, useFormContext } from "react-hook-form";

const AddressForm = ({
  prefix,
  index,
  canRemove,
  onRemove,
  apelido,
}: {
  prefix: `enderecos.${number}`;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  apelido: string;
}) => {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<UserData>();

  const e = (errors.enderecos as any)?.[index] ?? {};

  const fetchCep = async (cep: string) => {
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setValue(`${prefix}.rua`, data.logradouro || "", {
          shouldValidate: true,
        });
        setValue(`${prefix}.cidade`, data.localidade || "", {
          shouldValidate: true,
        });
        setValue(`${prefix}.estado`, data.uf || "", { shouldValidate: true });
      }
    } catch {}
  };

  return (
    <div className="border border-charcoal/10 bg-cream/50 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 bg-charcoal text-cream font-sans text-[10px] font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
            {apelido || `Endereço ${index + 1}`}
          </span>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="font-sans text-[10px] uppercase tracking-[0.15em] text-burgundy/40 hover:text-burgundy transition-colors"
          >
            Remover
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Apelido"
          placeholder="Casa, Trabalho…"
          registration={register(`${prefix}.apelido`)}
          error={e.apelido?.message}
        />
        <Select
          label="Tipo"
          required
          registration={register(`${prefix}.tipo`)}
          error={e.tipo?.message}
          options={[
            { value: "casa", label: "Casa" },
            { value: "apartamento", label: "Apartamento" },
            { value: "comercial", label: "Comercial" },
            { value: "outro", label: "Outro" },
          ]}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Input
          label="CEP"
          placeholder="00000-000"
          required
          registration={register(`${prefix}.cep`, {
            onChange: (e) => fetchCep(e.target.value),
          })}
          error={e.cep?.message}
        />
        <div className="col-span-2">
          <Input
            label="Rua / Logradouro"
            required
            registration={register(`${prefix}.rua`)}
            error={e.rua?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Input
          label="Número"
          required
          registration={register(`${prefix}.numero`)}
          error={e.numero?.message}
        />
        <div className="col-span-2">
          <Input
            label="Complemento"
            placeholder="Apto, bloco…"
            registration={register(`${prefix}.complemento`)}
            error={e.complemento?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Input
          label="UF"
          required
          registration={register(`${prefix}.estado`)}
          error={e.estado?.message}
        />
        <Input
          label="Cidade"
          required
          registration={register(`${prefix}.cidade`)}
          error={e.cidade?.message}
        />
        <Input
          label="País"
          required
          registration={register(`${prefix}.pais`)}
          error={e.pais?.message}
        />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
        <Controller
          control={control}
          name={`${prefix}.isCobranca`}
          render={({ field }) => (
            <Toggle
              label="Endereço de cobrança"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name={`${prefix}.isEntrega`}
          render={({ field }) => (
            <Toggle
              label="Endereço de entrega"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AddressForm;
