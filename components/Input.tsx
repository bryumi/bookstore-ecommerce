import { useForm } from "react-hook-form";

const Input = ({
  label,
  registration,
  error,
  type = "text",
  placeholder = "",
  required = false,
  hint = "",
  transform,
}: {
  label: string;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;

  transform?: (v: string) => string;
}) => {

  const wrappedRegistration = transform
    ? {
        ...registration,
        onChange: async (e: React.ChangeEvent<HTMLInputElement>) => {
          e.target.value = transform(e.target.value);
          return registration.onChange(e);
        },
      }
    : registration;

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-[10px] uppercase tracking-[0.18em] font-semibold text-charcoal/50">
        {label}
        {required && <span className="text-burgundy ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...wrappedRegistration}
        className={`w-full border bg-cream px-3.5 py-2.5 font-body text-sm text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:bg-white transition-all duration-200
          ${error ? "border-burgundy bg-burgundy/3" : "border-charcoal/15 focus:border-burgundy"}`}
      />
      {error ? (
        <span className="font-sans text-[10px] text-burgundy tracking-wide">
          {error}
        </span>
      ) : hint ? (
        <span className="font-sans text-[10px] text-charcoal/35 tracking-wide">
          {hint}
        </span>
      ) : null}
    </div>
  );
};

export default Input;
