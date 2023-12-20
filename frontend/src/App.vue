<script setup>
import { useMessageStore } from "./stores/messageStore";
import { useLoadingStore } from "./stores/loadingStore";

const { messages } = useMessageStore();
const { loading } = useLoadingStore();
</script>

<template>
  <v-app>
    <v-snackbar
      v-for="(message, index) in messages"
      :key="index"
      :color="message.type || 'info'"
      :modelValue="true"
      location="top"
      :timeout="message.timeout || 7000"
      class="mt-5"
    >
      {{ message.key ? $t(message.key, message.params) : message.message }}
      <v-icon color="white" v-if="message.reactionAddons">{{ message.reactionAddons.type }}</v-icon>
    </v-snackbar>
    <v-overlay :value="loading" opacity="0.7">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </v-overlay>
    <router-view v-slot="{ Component }">
      <v-fade-transition mode="out-in">
        <component :is="Component" />
      </v-fade-transition>
    </router-view>
  </v-app>
</template>

<style>
html,
body {
  min-height: 100vh;
}

.show-only-on-hover {
  opacity: 0;
}

td:hover .show-only-on-hover {
  opacity: 1;
}

#app {
  background: #ebeded;
  min-height: 100vh;
}

.v-application--wrap {
  min-height: 100% !important;
  min-height: -webkit-fill-available !important;
}

.v-navigation-drawer--is-mobile {
  height: 100% !important;
  height: -webkit-fill-available !important;
}
</style>
