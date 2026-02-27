const GhostBtn = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full border border-charcoal/20 text-charcoal font-sans text-[11px] uppercase tracking-[0.2em] py-3.5 hover:border-charcoal/35 hover:bg-charcoal/3 transition-all duration-200"
  >
    {children}
  </button>
);

export default GhostBtn;
