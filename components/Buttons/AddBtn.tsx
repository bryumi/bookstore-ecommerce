const AddBtn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-2.5 font-sans text-[11px] uppercase tracking-[0.15em] text-charcoal/35 hover:text-burgundy transition-colors duration-200"
  >
    <span className="w-5 h-5 border border-current flex items-center justify-center leading-none text-base">
      +
    </span>
    {children}
  </button>
);

export default AddBtn;
