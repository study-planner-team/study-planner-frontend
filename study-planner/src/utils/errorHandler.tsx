import { toast } from "react-toastify";

export const handleError = (error: any, customMessage?: string) => {
  if (error && error.response) {
    const responseData = error.response.data;

    // Case 1: If response.data is an array, display each errorMessage separately
    if (Array.isArray(responseData)) {
      responseData.forEach((errorItem: any) => {
        if (errorItem.errorMessage) {
          toast.error(errorItem.errorMessage);
        }
      });
    }
    // Case 2: If response.data is a string, display it as a toast
    else if (typeof responseData === "string") {
      toast.error(responseData);
    }
    // Default message
    else {
      toast.error(customMessage || "Coś poszło nie tak. Spróbuj ponownie.");
    }
  } else {
    toast.error(customMessage || "Coś poszło nie tak. Spróbuj ponownie.");
  }
};
