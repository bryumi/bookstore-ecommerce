const ModalSelect = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-charcoal/50">
      {label}
      {required && <span className="text-burgundy ml-0.5">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border bg-cream px-3 py-2.5 font-body text-sm text-charcoal
        focus:outline-none focus:bg-white transition-all duration-200 appearance-none cursor-pointer
        ${error ? "border-burgundy" : "border-charcoal/15 focus:border-burgundy"}`}
    >
      <option value="">Selecione…</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {error && (
      <span className="font-sans text-[10px] text-burgundy">{error}</span>
    )}
  </div>
);

export default ModalSelect;
