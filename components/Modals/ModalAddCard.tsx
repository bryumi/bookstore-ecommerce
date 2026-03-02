import { formatCardNumber, formatValidade, generateId } from "@/utils/mask";
import ModalInput from "./ModalInput";
import ModalToggle from "./ModalToggle";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { Card } from "@/types/mock.interface";

const emptyCardForm = () => ({
  numero: "",
  nomeImpresso: "",
  apelido: "",
  cvv: "",
  validade: "",
  isPreferencial: false,
});

type CardForm = ReturnType<typeof emptyCardForm>;
type CardErrors = Partial<Record<keyof CardForm, string>>;

const validateCard = (f: CardForm): CardErrors => {
  const e: CardErrors = {};
  const digits = f.numero.replace(/\s/g, "");
  if (!digits.match(/^\d{13,19}$/)) e.numero = "Número inválido";
  if (!f.nomeImpresso.trim() || f.nomeImpresso.length < 2)
    e.nomeImpresso = "Nome obrigatório";
  if (!f.validade.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) e.validade = "Use MM/AA";
  else {
    const [m, y] = f.validade.split("/").map(Number);
    const now = new Date();
    const exp = new Date(2000 + y, m - 1, 1);
    if (exp < new Date(now.getFullYear(), now.getMonth(), 1))
      e.validade = "Cartão expirado";
  }
  if (!f.cvv.match(/^\d{3,4}$/)) e.cvv = "CVV inválido";
  return e;
};

const AddCardModal = ({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (card: Card) => void;
}) => {
  const [form, setForm] = useState<CardForm>(emptyCardForm());
  const [errors, setErrors] = useState<CardErrors>({});

  const set = (key: keyof CardForm, value: any) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = () => {
    const errs = validateCard(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAdd({
      ...form,
      id: generateId(),
      nomeImpresso: form.nomeImpresso.toUpperCase(),
    });
    setForm(emptyCardForm());
    setErrors({});
    onClose();
  };

  useEffect(() => {
    if (open) {
      setForm(emptyCardForm());
      setErrors({});
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Novo Cartão"
      subtitle="Pode adicionar vários para dividir o pagamento"
    >
      <div className="space-y-4">
        {/* Live card preview */}
        <div className="relative h-[120px] bg-charcoal overflow-hidden p-5 flex flex-col justify-between mb-2">
          <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-burgundy/15 pointer-events-none" />
          <div className="absolute -bottom-6 right-10 w-28 h-28 rounded-full bg-gold/8 pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-cream/35">
              {form.apelido || "Novo Cartão"}
            </span>
          </div>

          <div className="relative">
            <p className="font-mono text-sm tracking-widest text-cream/85 mb-1.5">
              {form.numero
                ? form.numero
                    .padEnd(19, " ")
                    .replace(/(.{4})/g, "$1 ")
                    .trim()
                : "•••• •••• •••• ••••"}
            </p>
            <div className="flex justify-between">
              <span className="font-sans text-[10px] text-cream/45 uppercase tracking-wider">
                {form.nomeImpresso || "Nome no Cartão"}
              </span>
              <span className="font-sans text-[10px] text-cream/45 tracking-wider">
                {form.validade || "MM/AA"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ModalInput
            label="Número do Cartão"
            value={form.numero}
            placeholder="0000 0000 0000 0000"
            required
            error={errors.numero}
            onChange={(v) => set("numero", formatCardNumber(v))}
          />
          <ModalInput
            label="Apelido"
            value={form.apelido}
            placeholder="Nubank, Itaú…"
            onChange={(v) => set("apelido", v)}
          />
        </div>

        <ModalInput
          label="Nome Impresso no Cartão"
          value={form.nomeImpresso}
          placeholder="COMO APARECE NO CARTÃO"
          required
          error={errors.nomeImpresso}
          onChange={(v) => set("nomeImpresso", v.toUpperCase())}
        />

        <div className="grid grid-cols-2 gap-3">
          <ModalInput
            label="Validade"
            value={form.validade}
            placeholder="MM/AA"
            required
            error={errors.validade}
            onChange={(v) => set("validade", formatValidade(v))}
          />
          <ModalInput
            label="CVV"
            value={form.cvv}
            placeholder="000"
            type="password"
            required
            error={errors.cvv}
            onChange={(v) => set("cvv", v.replace(/\D/g, "").substring(0, 4))}
          />
        </div>

        <ModalToggle
          label="Marcar como cartão preferencial"
          checked={form.isPreferencial}
          onChange={(v) => set("isPreferencial", v)}
        />

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
            Adicionar Cartão
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCardModal;
