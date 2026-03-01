import { useStore } from "@/lib/store-context";
import { Address, Card, UserData } from "@/types/mock.interface";
import { formatBRL, maskCard, parseValue } from "@/utils/mask";
import { useCallback, useEffect, useMemo, useState } from "react";
import AddAddressModal from "./Modals/AddressModal";
import AddCardModal from "./Modals/ModalAddCard";

const SectionLabel = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="text-gold/50 text-xs">✦</span>
    <p className="font-sans text-[20px] uppercase tracking-[0.22em] font-semibold text-charcoal/50">
      {children}
    </p>
    <div className="flex-1 h-px bg-charcoal/8" />
    {action}
  </div>
);

export interface OrderPayload {
  enderecoId: string;
  pagamentos: { cardId: string; valor: number }[];
  total: number;
}
interface CardPayment {
  cardId: string;
  value: string; // string so user can type freely, converted to number on submit
}

interface OrderSummaryProps {
  user: UserData;
  onConfirm: (order: OrderPayload) => void;
  onUserUpdate?: (updated: UserData) => void;
}
export default function OrderSummary({
  user: initialUser,
  onConfirm,
  onUserUpdate,
}: OrderSummaryProps) {
  const [user, setUser] = useState<UserData>(initialUser);

  // Keep in sync if parent updates (e.g. profile edit)
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);
  const { cart, getCartTotal } = useStore();
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  // ── State ──
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    // pre-select the first delivery address, or first address
    user.enderecos.find((a) => a.isEntrega)?.id ?? user.enderecos[0]?.id ?? "",
  );

  const [cardPayments, setCardPayments] = useState<CardPayment[]>(
    // pre-select preferential card if exists
    user.cartoes.some((c) => c.isPreferencial)
      ? [{ cardId: user.cartoes.find((c) => c.isPreferencial)!.id, value: "" }]
      : [],
  );
  const persistUser = useCallback(
    (updated: UserData) => {
      setUser(updated);
      // Also persist to localStorage so it survives refresh
      localStorage.setItem("bookstore-user", JSON.stringify(updated));
      onUserUpdate?.(updated);
    },
    [onUserUpdate],
  );
  // ── Address add ──
  const handleAddAddress = (address: Address) => {
    const updated = { ...user, enderecos: [...user.enderecos, address] };
    persistUser(updated);
    // Auto-select newly added address
    setSelectedAddressId(address.id);
  };

  // ── Card add ──
  const handleAddCard = (card: Card) => {
    const updated = { ...user, cartoes: [...user.cartoes, card] };
    persistUser(updated);
    // Auto-add to payment list with empty value
    setCardPayments((prev) => [...prev, { cardId: card.id, value: "" }]);
  };

  const [error, setError] = useState<string | null>(null);

  const total = getCartTotal();

  // ── Payment math ──
  const allocatedTotal = useMemo(
    () => cardPayments.reduce((sum, p) => sum + parseValue(p.value), 0),
    [cardPayments],
  );

  const remaining = useMemo(
    () => Math.max(0, total - allocatedTotal),
    [total, allocatedTotal],
  );

  const isBalanced = Math.abs(allocatedTotal - total) < 0.01;

  // ── Card helpers ──
  const selectedCardIds = cardPayments.map((p) => p.cardId);

  const addCard = (cardId: string) => {
    if (selectedCardIds.includes(cardId)) return;
    setCardPayments((prev) => [
      ...prev.map((p, i) => {
        // on first add, distribute evenly
        return p;
      }),
      { cardId, value: "" },
    ]);
    setError(null);
  };

  const removeCard = (cardId: string) => {
    setCardPayments((prev) => prev.filter((p) => p.cardId !== cardId));
  };

  const updateValue = (cardId: string, value: string) => {
    // allow only numbers and single comma/dot
    const clean = value.replace(/[^0-9.,]/g, "").replace(/,/g, ".");
    setCardPayments((prev) =>
      prev.map((p) => (p.cardId === cardId ? { ...p, value: clean } : p)),
    );
    setError(null);
  };

  const distributeEvenly = () => {
    if (cardPayments.length === 0) return;
    const share = (total / cardPayments.length).toFixed(2);
    setCardPayments((prev) =>
      prev.map((p, i) => ({
        ...p,
        // last card absorbs rounding diff
        value:
          i === prev.length - 1
            ? (total - parseFloat(share) * (prev.length - 1)).toFixed(2)
            : share,
      })),
    );
    setError(null);
  };

  // ── Submit ──
  const handleConfirm = () => {
    setError(null);

    if (!selectedAddressId) {
      setError("Selecione um endereço de entrega.");
      return;
    }
    if (cardPayments.length === 0) {
      setError("Adicione ao menos um cartão para pagamento.");
      return;
    }
    if (!isBalanced) {
      setError(
        `O valor total alocado (${formatBRL(allocatedTotal)}) não corresponde ao total do pedido (${formatBRL(total)}).`,
      );
      return;
    }
    const zeroCard = cardPayments.find((p) => parseValue(p.value) <= 0);
    if (zeroCard) {
      const card = user.cartoes.find((c) => c.id === zeroCard.cardId);
      setError(
        `O cartão "${card?.apelido || maskCard(card?.numero ?? "")}" não possui valor alocado.`,
      );
      return;
    }

    onConfirm({
      enderecoId: selectedAddressId,
      pagamentos: cardPayments.map((p) => ({
        cardId: p.cardId,
        valor: parseValue(p.value),
      })),
      total,
    });
  };

  if (cart.length === 0) return null;

  const deliveryAddresses = user.enderecos.filter((a) => a.isEntrega);
  const allAddresses = user.enderecos;
  const addressList =
    deliveryAddresses.length > 0 ? deliveryAddresses : allAddresses;

  return (
    <>
      <AddAddressModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onAdd={handleAddAddress}
      />
      <AddCardModal
        open={cardModalOpen}
        onClose={() => setCardModalOpen(false)}
        onAdd={handleAddCard}
      />
      <div className="w-full space-y-6 px-11">
        {/* ── Order items ──────────────────────────────────────────────────────── */}
        <div className="bg-white border border-charcoal/8">
          <div className="px-6 pt-6 pb-2">
            <SectionLabel>Resumo do Pedido</SectionLabel>
          </div>

          <div className="divide-y divide-charcoal/5">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                <div className="w-20 h-20 overflow-hidden flex-shrink-0 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-xl font-semibold text-charcoal truncate">
                    {item.title}
                  </p>
                  <p className="font-body text-xl italic text-charcoal/40 truncate">
                    {item.author}
                  </p>
                  <p className="font-sans text-lg uppercase tracking-wider text-charcoal/30 mt-0.5">
                    Qtd. {item.quantity}
                  </p>
                </div>
                <p className="font-display text-lg font-semibold text-charcoal flex-shrink-0">
                  {formatBRL(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-6 pt-4 pb-6 space-y-2 border-t border-charcoal/5 mt-2">
            <div className="flex justify-between font-body text-lg text-charcoal/50">
              <span>Subtotal</span>
              <span>{formatBRL(total)}</span>
            </div>
            <div className="flex justify-between font-body text-lg text-charcoal/50">
              <span>Frete</span>
              <span className="text-sage font-medium">Grátis</span>
            </div>
            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-charcoal/8" />
              <span className="text-gold/40 text-[10px]">✦</span>
              <div className="flex-1 h-px bg-charcoal/8" />
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-sans text-lg uppercase tracking-[0.2em] text-charcoal/40">
                Total
              </span>
              <span className="font-display text-2xl font-bold text-charcoal">
                {formatBRL(total)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Delivery address ─────────────────────────────────────────────────── */}
        <div className="bg-white border border-charcoal/8">
          <div className="px-6 pt-6 pb-4">
            <SectionLabel
              action={
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(true)}
                  className="flex items-center gap-1.5 font-sans text-lg uppercase tracking-[0.15em] text-burgundy hover:text-burgundy/60 transition-colors whitespace-nowrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                  Novo
                </button>
              }
            >
              Endereço de Entrega
            </SectionLabel>

            {addressList.length === 0 ? (
              <p className="font-body text-lg italic text-charcoal/40">
                Nenhum endereço cadastrado.
              </p>
            ) : (
              <div className="space-y-2">
                {addressList.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`w-full text-left p-4 border transition-all duration-200 relative
                      ${
                        isSelected
                          ? "border-charcoal bg-charcoal/3"
                          : "border-charcoal/10 hover:border-charcoal/25"
                      }`}
                    >
                      {/* Selection indicator */}
                      <div
                        className={`absolute top-4 right-4 w-4 h-4 border-2 flex items-center justify-center transition-all duration-200
                      ${isSelected ? "border-charcoal bg-charcoal" : "border-charcoal/20"}`}
                      >
                        {isSelected && (
                          <svg
                            className="w-2.5 h-2.5 text-cream"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>

                      <div className="flex items-start gap-3 pr-8">
                        {/* <div
                        className={`mt-0.5 text-charcoal/40 ${isSelected ? "text-charcoal" : ""}`}
                      >
                        <AddressTypeIcon tipo={addr.tipo} />
                      </div> */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-sans text-lg font-semibold text-charcoal">
                              {addr.apelido || addr.tipo}
                            </p>
                            {addr.isCobranca && (
                              <span className="font-sans text-base uppercase tracking-wider text-burgundy bg-burgundy/8 px-1.5 py-0.5">
                                cobrança
                              </span>
                            )}
                            {addr.isEntrega && (
                              <span className="font-sans text-base uppercase tracking-wider text-sage bg-sage/10 px-1.5 py-0.5">
                                entrega
                              </span>
                            )}
                          </div>
                          <p className="font-body text-lg text-charcoal/55 leading-relaxed">
                            {addr.rua}, {addr.numero}
                            {addr.complemento ? `, ${addr.complemento}` : ""}
                          </p>
                          <p className="font-body text-base text-charcoal/40">
                            {addr.cidade} — {addr.estado}, {addr.pais} ·{" "}
                            {addr.cep}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ── Payment ──────────────────────────────────────────────────────────── */}
        <div className="bg-white border border-charcoal/8">
          <div className="px-6 pt-6 pb-6">
            <SectionLabel
              action={
                <button
                  type="button"
                  onClick={() => setCardModalOpen(true)}
                  className="flex items-center gap-1.5 font-sans text-lg uppercase tracking-[0.15em] text-burgundy hover:text-burgundy/60 transition-colors whitespace-nowrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                  Novo
                </button>
              }
            >
              Forma de Pagamento
            </SectionLabel>

            {/* Available cards to add */}
            <div className="mb-4">
              <p className="font-sans text-base uppercase tracking-[0.15em] text-charcoal/35 mb-2">
                Seus cartões
              </p>
              <div className="flex flex-wrap gap-2">
                {user.cartoes.map((card) => {
                  const alreadyAdded = selectedCardIds.includes(card.id);
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() =>
                        alreadyAdded ? removeCard(card.id) : addCard(card.id)
                      }
                      className={`flex items-center gap-2 px-3 py-2 border text-left transition-all duration-200
                      ${
                        alreadyAdded
                          ? "border-charcoal bg-charcoal text-cream"
                          : "border-charcoal/15 hover:border-charcoal/35 text-charcoal"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-sans text-base uppercase tracking-wider leading-tight">
                          {card.apelido || maskCard(card.numero)}
                        </span>
                        <span
                          className={`font-mono text-base leading-tight ${alreadyAdded ? "text-cream/50" : "text-charcoal/35"}`}
                        >
                          {maskCard(card.numero)}
                        </span>
                      </div>
                      {/* <BrandBadge numero={card.numero} /> */}
                      {alreadyAdded && (
                        <svg
                          className="w-3 h-3 text-cream/60 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      {card.isPreferencial && !alreadyAdded && (
                        <span className="font-sans text-base text-gold uppercase tracking-wider">
                          ★
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Value allocation per card */}
            {cardPayments.length > 0 && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-sans text-base uppercase tracking-[0.15em] text-charcoal/35">
                    Distribuição do pagamento
                  </p>
                  {cardPayments.length > 1 && (
                    <button
                      type="button"
                      onClick={distributeEvenly}
                      className="font-sans text-[10px] uppercase tracking-[0.1em] text-burgundy hover:text-burgundy/60 transition-colors"
                    >
                      Dividir igualmente
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {cardPayments.map((payment: any) => {
                    const card = user.cartoes.find(
                      (c: any) => c.id === payment.cardId,
                    )!;
                    const parsedVal = parseValue(payment.value);
                    const pct = total > 0 ? (parsedVal / total) * 100 : 0;

                    return (
                      <div
                        key={payment.cardId}
                        className="border border-charcoal/10 p-3 space-y-2"
                      >
                        {/* Card info row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-base font-semibold text-charcoal">
                              {card.apelido || maskCard(card.numero)}
                            </span>
                            <span className="font-mono text-base text-charcoal/30">
                              {maskCard(card.numero)}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCard(payment.cardId)}
                            className="text-charcoal/20 hover:text-burgundy transition-colors text-base"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Value input */}
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-base text-charcoal/40">
                            R$
                          </span>
                          <input
                            type="text"
                            inputMode="decimal"
                            value={payment.value}
                            onChange={(e) =>
                              updateValue(payment.cardId, e.target.value)
                            }
                            placeholder={
                              remaining > 0 && parsedVal === 0
                                ? remaining.toFixed(2)
                                : "0,00"
                            }
                            className="flex-1 border border-charcoal/12 bg-cream px-2.5 py-1.5 font-mono text-base text-charcoal placeholder:text-charcoal/20 focus:outline-none focus:border-burgundy transition-all"
                          />
                          {parsedVal > 0 && (
                            <span className="font-sans text-base text-charcoal/35 whitespace-nowrap">
                              {pct.toFixed(0)}%
                            </span>
                          )}
                        </div>

                        {/* Progress bar */}
                        {parsedVal > 0 && (
                          <div className="h-0.5 bg-charcoal/6 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${pct > 100 ? "bg-burgundy" : "bg-sage"}`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Balance tracker */}
                <div
                  className={`flex items-center justify-between p-3 border transition-colors duration-200
                ${
                  isBalanced
                    ? "border-sage/30 bg-sage/5"
                    : allocatedTotal > total
                      ? "border-burgundy/30 bg-burgundy/4"
                      : "border-charcoal/8 bg-cream/50"
                }`}
                >
                  <div className="flex items-center gap-2">
                    {isBalanced ? (
                      <>
                        <svg
                          className="w-3.5 h-3.5 text-sage"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="font-sans text-lg uppercase tracking-[0.15em] text-sage">
                          Valor distribuído corretamente
                        </span>
                      </>
                    ) : allocatedTotal > total ? (
                      <>
                        <svg
                          className="w-3.5 h-3.5 text-burgundy"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-sans text-lg uppercase tracking-[0.15em] text-burgundy">
                          Excede em {formatBRL(allocatedTotal - total)}
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3.5 h-3.5 text-charcoal/30"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="font-sans text-lg uppercase tracking-[0.15em] text-charcoal/35">
                          Faltam {formatBRL(remaining)}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-sans text-base text-charcoal/30 uppercase tracking-wider">
                      {formatBRL(allocatedTotal)} / {formatBRL(total)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {cardPayments.length === 0 && (
              <p className="font-body text-xl italic text-charcoal/35 mt-2">
                Selecione ao menos um cartão acima para pagar.
              </p>
            )}
          </div>
        </div>

        {/* ── Error ────────────────────────────────────────────────────────────── */}
        {error && (
          <div className="flex items-start gap-3 p-4 border border-burgundy/30 bg-burgundy/4">
            <svg
              className="w-4 h-4 text-burgundy flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-body text-base text-burgundy">{error}</p>
          </div>
        )}

        {/* ── Confirm ──────────────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full bg-charcoal text-cream font-sans text-base uppercase tracking-[0.2em] py-4 hover:bg-burgundy disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-3"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Confirmar Pedido · {formatBRL(total)}
        </button>

        <p className="text-center font-sans text-base uppercase tracking-[0.15em] text-charcoal/20">
          🔒 Transação protegida com criptografia
        </p>
      </div>
    </>
  );
}
