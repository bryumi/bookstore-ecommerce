const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-gold/50 text-xs">✦</span>
    <h3 className="font-display text-lg text-charcoal font-semibold tracking-tight">
      {children}
    </h3>
    <div className="flex-1 h-px bg-charcoal/8" />
  </div>
);

export default SectionTitle;
