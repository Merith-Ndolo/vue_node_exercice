import { defineStore } from "pinia";
import axios from "@/plugins/axios";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const me = ref();
  const authToken = ref(localStorage.getItem("authToken"));

  async function authenticate(token) {
    if (token) {
      authToken.value = token;
      localStorage.setItem("authToken", token);
      axios.defaults.headers.common = axios.defaults.headers.common || {};
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    try {
      me.value = (await axios.get(`/api/auth/me`)).data;
    } catch (err) {
      logout();
      return null;
    }
    if (!me.value) logout();
    return me.value;
  }

  function logout() {
    authToken.value = null;
    localStorage.removeItem("authToken");
    me.value = null;
  }

  return { authToken, me, authenticate, logout };
});
