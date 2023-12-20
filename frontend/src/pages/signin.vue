<script setup>
import axios from "@/plugins/axios";
import { useMessageStore } from "@/stores/messageStore";
import { useAuthStore } from "@/stores/authStore";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { REGEX } from "@/constants/regex";
const { t: $t } = useI18n();

const { authenticate } = useAuthStore();
const router = useRouter();

const data = reactive({
  valid: false,
  phoneNumberExists: false,
  phone: "",
  code: "",
  lastName: "",
  registrationNumber: "",
  showAlternativeLoginFrom: true,
});

const { valid, registrationNumber } = toRefs(data);

async function submit() {
  if (data.showAlternativeLoginFrom) {
    if (data.phoneNumberExists) {
      loginWithCode();
    } else {
      requestCode();
    }
  } else {
    loginWithRegistrationNumber();
  }
}
async function requestCode() {
  const auth = (
    await axios.post("/api/auth/sendCode", {
      phone: data.phone,
    })
  ).data;
  if (auth) {
    data.phoneNumberExists = true;
  } else {
    useMessageStore().error($t("login.phone_not_found"));
  }
}

async function loginWithCode() {
  const auth = (
    await axios.post("/api/auth/loginWithCode", {
      phone: data.phone,
      code: data.code,
    })
  ).data;

  if (!auth) {
    useMessageStore().error($t("login.incorrect_code"));
    return;
  }

  await authenticate(auth.access_token);

  router.push("/").catch(() => {});
}

async function loginWithRegistrationNumber() {
  const auth = (
    await axios.post("/api/auth/loginWithRegistrationNumber", {
      lastName: data.lastName,
      registrationNumber: data.registrationNumber,
    })
  ).data;

  if (!auth) {
    useMessageStore().error($t("login.incorrect_last_name_or_register_number"));
    return;
  }

  await authenticate(auth.access_token);

  router.push("/").catch(() => {});
}

function toggleForm() {
  data.showAlternativeLoginFrom = !data.showAlternativeLoginFrom;
}

const registrationNumberRule = (/** @type {string} */ value) => {
  if (!REGEX.REGISTRATION_NUMBER.test(value)) {
    return $t("login.invalid_registration_number_format");
  }

  return true;
};

const validateRegistrationNumber = () => {
  valid.value = registrationNumberRule(registrationNumber.value) === true;
};
</script>
<template>
  <div>
    <v-row justify="center" dense>
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card class="mt-5 elevation-12">
          <v-card-title class="text-center pb-0">
            {{ $t("login.title") }}
          </v-card-title>

          <transition name="fade" mode="out-in">
            <div :key="String(data.showAlternativeLoginFrom)">
              <v-form @submit.prevent="submit" v-model="data.valid">
                <v-card-text class="px-6" v-if="data.showAlternativeLoginFrom">
                  <v-phone-input
                    defaultCountry="fr"
                    v-model="data.phone"
                    :countryLabel="null"
                    :label="$t('login.phone')"
                    :placeholder="$t('login.phone')"
                    :preferCountries="['fr']"
                  ></v-phone-input>
                  <v-text-field
                    class="prepend-icon-wide"
                    v-if="data.phoneNumberExists"
                    prepend-icon="mdi-key"
                    :label="$t('login.code')"
                    v-model="data.code"
                    required
                    :rules="[$v.required()]"
                    type="number"
                  ></v-text-field>
                </v-card-text>

                <v-card-text class="px-6" v-else>
                  <v-text-field
                    v-model="data.lastName"
                    :label="$t('login.last_name')"
                    :placeholder="$t('login.last_name_placeholder')"
                    required
                  >
                    <template #prepend>
                      <v-icon>mdi-account</v-icon>
                    </template>
                  </v-text-field>
                  <v-text-field
                    v-model="data.registrationNumber"
                    :label="$t('login.registration_number')"
                    :placeholder="$t('login.registration_number_placeholder')"
                    required
                    @input="validateRegistrationNumber"
                    :rules="[registrationNumberRule]"
                  >
                    <template #prepend>
                      <v-icon>mdi-text</v-icon>
                    </template>
                  </v-text-field>
                </v-card-text>

                <v-card-actions class="justify-center">
                  <v-btn
                    type="submit"
                    :disabled="!(data.valid && (data.phone || (data.lastName && data.registrationNumber)))"
                    color="secondary"
                  >
                    {{ data.showAlternativeLoginFrom ? $t("login.sendCode") : $t("login.submit") }}
                  </v-btn>
                </v-card-actions>
              </v-form>

              <v-divider></v-divider>
              <v-card-actions class="justify-end">
                <button color="primary" @click="toggleForm">
                  <span class="toggleButton">{{
                    data.showAlternativeLoginFrom ? $t("login.CodeLogin") : $t("login.RegisterNumberLogin")
                  }}</span>
                </button>
              </v-card-actions>
            </div>
          </transition>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.prepend-icon-wide .v-input__prepend-outer {
  margin: 0 25px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.toggleButton {
  text-decoration: underline;
  text-underline-offset: 2px;
  font-size: 14px;
  color: skyblue;
}
</style>
