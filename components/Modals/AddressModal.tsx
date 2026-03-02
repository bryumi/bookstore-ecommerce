import { Address } from "@/types/mock.interface";
import { generateId } from "@/utils/mask";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import ModalInput from "./ModalInput";
import ModalSelect from "./ModalSelect";
import ModalToggle from "./ModalToggle";

const emptyAddressForm = () => ({
  apelido: "",
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  cidade: "",
  estado: "",
  pais: "Brasil",
  tipo: "casa" as Address["tipo"],
  isCobranca: false,
  isEntrega: true,
});

type AddressForm = ReturnType<typeof emptyAddressForm>;
type AddressErrors = Partial<Record<keyof AddressForm, string>>;

const validateAddress = (f: AddressForm): AddressErrors => {
  const e: AddressErrors = {};
  if (!f.cep.match(/^\d{5}-\d{3}$/)) e.cep = "CEP inválido (00000-000)";
  if (!f.rua.trim()) e.rua = "Rua é obrigatória";
  if (!f.numero.trim()) e.numero = "Número é obrigatório";
  if (!f.cidade.trim()) e.cidade = "Cidade é obrigatória";
  if (!f.estado.match(/^[A-Za-z]{2}$/)) e.estado = "UF inválida (ex: SP)";
  if (!f.pais.trim()) e.pais = "País é obrigatório";
  if (!f.tipo) e.tipo = "Tipo é obrigatório";
  return e;
};

function AddAddressModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (address: Address) => void;
}) {
  const [form, setForm] = useState<AddressForm>(emptyAddressForm());
  const [errors, setErrors] = useState<AddressErrors>({});
  const [fetching, setFetching] = useState(false);

  const set = (key: keyof AddressForm, value: any) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleCep = async (raw: string) => {
    const formatted = raw
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{1,3})/, "$1-$2")
      .substring(0, 9);
    set("cep", formatted);
    const digits = formatted.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setFetching(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm((p) => ({
          ...p,
          cep: formatted,
          rua: data.logradouro || p.rua,
          cidade: data.localidade || p.cidade,
          estado: data.uf || p.estado,
        }));
      }
    } catch {
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = () => {
    const errs = validateAddress(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAdd({ ...form, id: generateId() });
    setForm(emptyAddressForm());
    setErrors({});
    onClose();
  };

  // Reset on open
  useEffect(() => {
    if (open) {
      setForm(emptyAddressForm());
      setErrors({});
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Novo Endereço"
      subtitle="Será usado apenas neste pedido"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <ModalInput
            label="Apelido"
            value={form.apelido}
            placeholder="Casa, Trabalho…"
            onChange={(v) => set("apelido", v)}
          />
          <ModalSelect
            label="Tipo"
            value={form.tipo}
            required
            onChange={(v) => set("tipo", v as Address["tipo"])}
            error={errors.tipo}
            options={[
              { value: "casa", label: "Casa" },
              { value: "apartamento", label: "Apartamento" },
              { value: "comercial", label: "Comercial" },
              { value: "outro", label: "Outro" },
            ]}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="relative">
            <ModalInput
              label="CEP"
              value={form.cep}
              placeholder="00000-000"
              required
              onChange={handleCep}
              error={errors.cep}
            />
            {fetching && (
              <span className="absolute right-3 top-8 text-charcoal/30">
                <svg
                  className="w-3.5 h-3.5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              </span>
            )}
          </div>
          <div className="col-span-2">
            <ModalInput
              label="Rua / Logradouro"
              value={form.rua}
              required
              onChange={(v) => set("rua", v)}
              error={errors.rua}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <ModalInput
            label="Número"
            value={form.numero}
            required
            onChange={(v) => set("numero", v)}
            error={errors.numero}
          />
          <div className="col-span-2">
            <ModalInput
              label="Complemento"
              value={form.complemento}
              placeholder="Apto, bloco…"
              onChange={(v) => set("complemento", v)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <ModalInput
            label="UF"
            value={form.estado}
            required
            onChange={(v) => set("estado", v.toUpperCase().substring(0, 2))}
            error={errors.estado}
          />
          <ModalInput
            label="Cidade"
            value={form.cidade}
            required
            onChange={(v) => set("cidade", v)}
            error={errors.cidade}
          />
          <ModalInput
            label="País"
            value={form.pais}
            required
            onChange={(v) => set("pais", v)}
            error={errors.pais}
          />
        </div>

        <div className="flex flex-wrap gap-5 pt-1">
          <ModalToggle
            label="Endereço de cobrança"
            checked={form.isCobranca}
            onChange={(v) => set("isCobranca", v)}
          />
          <ModalToggle
            label="Endereço de entrega"
            checked={form.isEntrega}
            onChange={(v) => set("isEntrega", v)}
          />
        </div>

        <div className="flex gap-3 pt-2 border-t border-charcoal/6 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-charcoal/18 text-charcoal font-sans text-[11px] uppercase tracking-[0.18em] py-3 hover:border-charcoal/35 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-charcoal text-cream font-sans text-[11px] uppercase tracking-[0.18em] py-3 hover:bg-burgundy transition-colors duration-200"
          >
            Adicionar Endereço
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddAddressModal;
