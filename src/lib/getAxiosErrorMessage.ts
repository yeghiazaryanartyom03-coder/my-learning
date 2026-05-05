import axios from "axios";

export function getAxiosErrorMessage(
  error: unknown,
  fallbackMessage = "Something went wrong"
) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === "string") {
      return message;
    }
  }

  return fallbackMessage;
}