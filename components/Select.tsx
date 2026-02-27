import { useForm } from "react-hook-form";

const Select = ({
  label,
  registration,
  error,
  options,
  required = false,
}: {
  label: string;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
  error?: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-charcoal/50">
      {label}
      {required && <span className="text-burgundy ml-0.5">*</span>}
    </label>
    <select
      {...registration}
      className={`w-full border bg-cream px-3.5 py-2.5 font-body text-sm text-charcoal focus:outline-none focus:bg-white transition-all duration-200 appearance-none cursor-pointer
        ${error ? "border-burgundy bg-burgundy/3" : "border-charcoal/15 focus:border-burgundy"}`}
    >
      <option value="">Selecione…</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
    {error && (
      <span className="font-sans text-[10px] text-burgundy tracking-wide">
        {error}
      </span>
    )}
  </div>
);

export default Select;
