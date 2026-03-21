// components/SnackbarComponent.tsx
import { Snackbar, Alert } from "@mui/material";

interface Props {
  open: boolean;
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

export function SnackbarComponent({ open, message, type, onClose }: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
