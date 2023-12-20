<script setup>
import { onMounted } from "vue";
import axios from "../plugins/axios";
import { useLocaleStore } from "../stores/localeStore";
import { computed } from "vue";

const languages = [
  {
    locale: "en",
    name: "English",
    icon: `assets/en.svg`,
  },
  {
    locale: "fr",
    name: "Français",
    icon: `assets/fr.svg`,
  },
];
const currentLanguage = computed(() => languages.find((l) => l.locale === useLocaleStore().locale));

onMounted(() => (axios.defaults.headers.common["Content-Language"] = useLocaleStore().locale || "en"));

function setLanguage(lang) {
  useLocaleStore().locale = lang;
  axios.defaults.headers.common["Content-Language"] = lang;
}
</script>

<template>
  <v-menu offset-y>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" class="mr-3" :title="currentLanguage.name">
        <img :src="currentLanguage.icon" width="24px" :alt="currentLanguage.name" />
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item
        v-for="language in languages"
        v-bind:key="language.locale"
        @click="setLanguage(language.locale)"
        ripple
        :title="language.name"
      >
        <img :src="language.icon" width="24px" :alt="language.name" />
      </v-list-item>
    </v-list>
  </v-menu>
</template>
