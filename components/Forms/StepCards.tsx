import { emptyCard } from "@/utils/mask";
import AddBtn from "../Buttons/AddBtn";
import FieldError from "../FieldError";
import CardForm from "./CardForm";
import SectionTitle from "../SectionTitle";
import { useFieldArray, useFormContext } from "react-hook-form";
import { UserData } from "@/types/mock.interface";

const StepCards = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<UserData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cartoes",
  });

  return (
    <>
      <SectionTitle>Cartões de Pagamento</SectionTitle>
      <div className="space-y-3">
        {fields.map((field, i) => (
          <CardForm
            key={field.id}
            prefix={`cartoes.${i}`}
            index={i}
            canRemove={fields.length > 1}
            onRemove={() => remove(i)}
            apelido={watch(`cartoes.${i}.apelido`)}
            cardNumero={watch(`cartoes.${i}.numero`)}
            cardNome={watch(`cartoes.${i}.nomeImpresso`)}
            cardValidade={watch(`cartoes.${i}.validade`)}
          />
        ))}
      </div>

      <FieldError
        message={
          (errors.cartoes as any)?.root?.message ??
          (errors.cartoes as any)?.message
        }
      />
      <AddBtn onClick={() => append(emptyCard())}>
        Adicionar outro cartão
      </AddBtn>
    </>
  );
};

export default StepCards;
