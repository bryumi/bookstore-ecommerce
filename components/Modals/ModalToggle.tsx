const ModalToggle = ({
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
    className="flex items-center gap-3"
  >
    <div
      className={`relative w-8 h-[18px] transition-colors duration-200 ${checked ? "bg-burgundy" : "bg-charcoal/15"}`}
    >
      <div
        className={`absolute top-0.5 w-[14px] h-[14px] bg-white shadow-sm transition-transform duration-200
        ${checked ? "translate-x-[18px]" : "translate-x-0.5"}`}
      />
    </div>
    <span
      className={`font-body text-sm transition-colors ${checked ? "text-charcoal" : "text-charcoal/45"}`}
    >
      {label}
    </span>
  </button>
);

export default ModalToggle;
