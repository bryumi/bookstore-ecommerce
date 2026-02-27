const PrimaryBtn = ({
  children,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full bg-charcoal text-cream font-sans text-[11px] uppercase tracking-[0.2em] py-3.5 hover:bg-burgundy transition-colors duration-300 flex items-center justify-center gap-2"
  >
    {children}
  </button>
);

export default PrimaryBtn;
