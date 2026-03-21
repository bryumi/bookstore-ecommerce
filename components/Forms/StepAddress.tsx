import { useFieldArray, useFormContext } from "react-hook-form";
import SectionTitle from "../SectionTitle";
import AddressForm from "./AddressForm";
import AddBtn from "../Buttons/AddBtn";
import FieldError from "../FieldError";
import { emptyAddress } from "@/utils/mask";
import { UserData } from "@/types/mock.interface";

const StepAddresses = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<UserData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "enderecos",
  });

  return (
    <>
      <SectionTitle>Endereços</SectionTitle>
      <div className="space-y-3">
        {fields.map((field, i) => (
          <AddressForm
            key={field.id}
            prefix={`enderecos.${i}`}
            index={i}
            canRemove={fields.length > 1}
            onRemove={() => remove(i)}
            apelido={watch(`enderecos.${i}.apelido`)}
          />
        ))}
      </div>

      <FieldError
        message={
          (errors.enderecos as any)?.root?.message ??
          (errors.enderecos as any)?.message
        }
      />

      <AddBtn onClick={() => append(emptyAddress())}>
        Adicionar outro endereço
      </AddBtn>
    </>
  );
};

export default StepAddresses;
