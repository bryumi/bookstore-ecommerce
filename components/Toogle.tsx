const Toggle = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="flex items-center gap-3 group"
  >
    <div
      className={`relative w-9 h-5 transition-colors duration-300 ${checked ? "bg-burgundy" : "bg-charcoal/15"}`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 bg-white shadow-sm transition-transform duration-300 ${checked ? "translate-x-4" : "translate-x-0.5"}`}
      />
    </div>
    <span
      className={`font-body text-sm transition-colors duration-200 ${checked ? "text-charcoal" : "text-charcoal/45"}`}
    >
      {label}
    </span>
  </button>
);

export default Toggle;
