import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref(false);
  /**
   *
   * @param {boolean} value
   */
  function setLoading(value) {
    loading.value = value;
  }
  return { loading, setLoading };
});
