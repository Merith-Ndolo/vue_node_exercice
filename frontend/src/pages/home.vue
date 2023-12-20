<script setup>
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
const { me, logout } = useAuthStore();
const router = useRouter();

async function disconnect() {
  await logout();
  router.push("signin");
}
</script>
<template>
  <div>
    <v-row justify="center" dense>
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card class="mt-5 elevation-12">
          <v-card-title class="text-center text-subtitle-1 font-weight-medium pb-0">
            {{ me.Event.name }}
          </v-card-title>
          <v-card-text> {{ me.first_name }} {{ me.last_name }} </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" @click="disconnect">{{ $t("logout") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
