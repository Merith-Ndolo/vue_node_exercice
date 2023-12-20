import { defineStore } from "pinia";
import { ref } from "vue";

export const useLocaleStore = defineStore("locale", () => {
  /**
   * @type {import("vue").Ref<"fr"|"en">}
   */
  const locale = ref("fr");
  return { locale };
});
