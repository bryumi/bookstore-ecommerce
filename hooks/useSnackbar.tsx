import { SnackbarComponent } from "@/components/Snackbar";
import { createContext, useContext, useState } from "react";

type SnackbarType = "success" | "error" | "info" | "warning";

interface SnackbarContextData {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextData | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("info");

  function showSnackbar(msg: string, variant: SnackbarType = "info") {
    setMessage(msg);
    setType(variant);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <SnackbarComponent
        open={open}
        message={message}
        type={type}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  return context;
}
