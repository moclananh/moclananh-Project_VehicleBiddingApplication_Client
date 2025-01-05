import axios from "axios";
import toast from "react-hot-toast";

export const handleAxiosError = (error: unknown): void => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with a status code outside the success range
      const response = error.response.data;
      toast.error(response.detail || "An error occurred");
    } else if (error.request) {
      // Request was made but no response received
      toast.error("No response from the server. Please try again.");
    } else {
      // Error during request setup
      toast.error("An error occurred while setting up the request.");
    }
  } else {
    // Non-Axios error
    toast.error("An unexpected error occurred.");
  }
};
