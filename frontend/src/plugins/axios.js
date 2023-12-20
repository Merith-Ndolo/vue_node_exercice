import axios from "axios";
import pinia from "../stores";
import { useAuthStore } from "../stores/authStore";
import { useMessageStore } from "../stores/messageStore";
import router from "../router";

axios.defaults.baseURL = import.meta.env.VUE_APP_API_BASE_PATH;

/**
 * Error handler
 */
axios.interceptors.response.use(
  (r) => r,
  (error) => {
    if (!error.response) {
      useMessageStore(pinia).i18nMessage("error", "errors.server.notreachable");
      return;
    }
    const status = error.response.status;
    const errorData = error.response.data.error || error.response.data;
    if (status === 401) {
      if (console && console.log) console.log("401 Unauthorized", errorData);
      useMessageStore(pinia).i18nMessage("errors.server.unauthorized");
      useAuthStore(pinia).logout();
      router.push("/login");
    } else if (status === 400) {
      if (console && console.log) console.log("Bad request", errorData);
      if (errorData.name === "AppError") {
        useMessageStore(pinia).i18nMessage("error", errorData.message, errorData.params);
      } else {
        useMessageStore(pinia).i18nMessage("error", "errors.server.validation");
      }
    } else if (status === 500) {
      if (console && console.log) console.log("Technical error", errorData);
      useMessageStore(pinia).i18nMessage("error", "errors.server.technical");
    } else {
      if (console && console.log) console.log("Unexpected error", status, errorData);
      useMessageStore(pinia).i18nMessage("error", "errors.server.unexpected");
    }
  }
);
export default axios;
