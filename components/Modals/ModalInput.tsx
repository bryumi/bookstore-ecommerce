const ModalInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error,
  required = false,
  hint = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
  hint?: string;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-charcoal/50">
      {label}
      {required && <span className="text-burgundy ml-0.5">*</span>}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border bg-cream px-3 py-2.5 font-body text-sm text-charcoal
        placeholder:text-charcoal/25 focus:outline-none focus:bg-white transition-all duration-200
        ${error ? "border-burgundy" : "border-charcoal/15 focus:border-burgundy"}`}
    />
    {error ? (
      <span className="font-sans text-[10px] text-burgundy">{error}</span>
    ) : hint ? (
      <span className="font-sans text-[10px] text-charcoal/35">{hint}</span>
    ) : null}
  </div>
);

export default ModalInput;
