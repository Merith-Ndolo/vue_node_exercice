<script setup>
import LangSwitcher from "@/components/_langSwitcher.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRoute } from "vue-router";

const { me } = useAuthStore();
const route = useRoute();
</script>

<template>
  <div class="fill-height">
    <v-app-bar fixed app class="header-toolbar">
      <v-spacer />
      <lang-switcher />
      <div v-show="me && !route.meta.hideMenus" class="mr-1">
        <v-btn icon to="/">
          <v-icon large>mdi-account-cog</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main id="main" class="fill-height">
      <v-container class="pa-2 fill-height justify-center">
        <v-row justify="center" class="fill-height" no-gutters>
          <v-col xl="9">
            <router-view v-slot="{ Component }">
              <v-slide-x-reverse-transition mode="out-in">
                <component :is="Component" />
              </v-slide-x-reverse-transition>
            </router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>
