import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMessageStore = defineStore("message", () => {
  const messages = reactive([]);
  function success(message) {
    messages.push({
      type: "success",
      message: message,
      timeout: 4000,
    });
  }
  function error(message) {
    messages.push({
      type: "error",
      message: message,
    });
  }
  function warning(message) {
    messages.push({
      type: "warning",
      message: message,
    });
  }
  function info(message) {
    messages.push({
      type: "info",
      message: message,
      timeout: 6000,
    });
  }
  function i18nMessage(type, key, params, timeout) {
    messages.push({
      type,
      key,
      params,
      timeout,
    });
  }
  function customMessage(type, message, timeout) {
    messages.push({
      type,
      message,
      timeout,
    });
  }
  return { messages, success, error, warning, info, i18nMessage, customMessage };
});
