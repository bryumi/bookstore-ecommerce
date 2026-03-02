import { useEffect } from "react";

const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => {

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease" }}
      />


      <div
        className="relative w-full sm:max-w-lg bg-cream border-t sm:border border-charcoal/12 shadow-2xl
          max-h-[92dvh] flex flex-col"
        style={{ animation: "slideUp 0.25s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Drag handle (mobile) */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-8 h-1 bg-charcoal/15 rounded-full" />
        </div>

        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-charcoal/8 flex-shrink-0">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-gold mb-0.5">
              Adicionar
            </p>
            <h2 className="font-display text-xl font-semibold text-charcoal">
              {title}
            </h2>
            {subtitle && (
              <p className="font-body text-xs italic text-charcoal/40 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-charcoal/25 hover:text-charcoal transition-colors mt-0.5 p-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
};

export default Modal;
