import axios, { AxiosError } from "axios";

const isBackEndError = (err: any): err is AxiosError<{ message: string }> => {
  if (err.response.data) {
    return true;
  }
  return false;
};

export const getErrorMessage = (err: any): string => {
  if (axios.isAxiosError(err)) {
    if (isBackEndError(err)) {
      return err.response?.data.message as string;
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  if (typeof err === "string") {
    return err;
  }

  return err?.message || "";
};
