import { Card, UserData } from "@/types/mock.interface";
import Toggle from "../Toogle";
import Input from "../Input";
import { formatCardNumber, formatValidade, maskCardNumber } from "@/utils/mask";
import { Controller, useFormContext } from "react-hook-form";

const CardForm = ({
  prefix,
  index,
  canRemove,
  onRemove,
  apelido,
  cardNumero,
  cardNome,
  cardValidade,
}: {
  prefix: `cartoes.${number}`;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  apelido: string;
  cardNumero: string;
  cardNome: string;
  cardValidade: string;
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<UserData>();
  const e = (errors.cartoes as any)?.[index] ?? {};

  return (
    <div className="border border-charcoal/10 bg-cream/50 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 bg-charcoal text-cream font-sans text-[10px] font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
            {apelido || `Cartão ${index + 1}`}
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

      {/* Card preview */}
      <div className="relative h-32 bg-charcoal overflow-hidden p-5 flex flex-col justify-between">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-burgundy/15" />
        <div className="absolute -bottom-6 right-8 w-24 h-24 rounded-full bg-gold/8" />
        <span className="relative font-sans text-[9px] uppercase tracking-[0.3em] text-cream/35">
          {apelido || "Meu Cartão"}
        </span>
        <div className="relative">
          <p className="font-mono text-sm tracking-widest text-cream/85 mb-1.5">
            {cardNumero ? maskCardNumber(cardNumero) : "•••• •••• •••• ••••"}
          </p>
          <div className="flex justify-between">
            <span className="font-sans text-[10px] text-cream/45 uppercase tracking-wider">
              {cardNome || "Nome no Cartão"}
            </span>
            <span className="font-sans text-[10px] text-cream/45 tracking-wider">
              {cardValidade || "MM/AA"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Número do Cartão"
          placeholder="0000 0000 0000 0000"
          required
          registration={register(`${prefix}.numero`)}
          transform={formatCardNumber}
          error={e.numero?.message}
        />
        <Input
          label="Apelido"
          placeholder="Nubank, Itaú…"
          registration={register(`${prefix}.apelido`)}
          error={e.apelido?.message}
        />
      </div>

      <Input
        label="Nome Impresso no Cartão"
        placeholder="COMO APARECE NO CARTÃO"
        required
        registration={register(`${prefix}.nomeImpresso`, {
          onChange: (e) => {
            e.target.value = e.target.value.toUpperCase();
          },
        })}
        error={e.nomeImpresso?.message}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Validade"
          placeholder="MM/AA"
          required
          registration={register(`${prefix}.validade`)}
          transform={formatValidade}
          error={e.validade?.message}
        />
        <Input
          label="CVV"
          placeholder="000"
          type="password"
          required
          registration={register(`${prefix}.cvv`, {
            onChange: (e) => {
              e.target.value = e.target.value
                .replace(/\D/g, "")
                .substring(0, 4);
            },
          })}
          error={e.cvv?.message}
        />
      </div>

      <Controller
        control={control}
        name={`${prefix}.isPreferencial`}
        render={({ field }) => (
          <Toggle
            label="Cartão preferencial para pagamentos"
            checked={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
};

export default CardForm;
