/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import i18n from "./i18n";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  defaultTheme: "light",
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#F3F3F3",
          header: "#FBFBFD",
          footer: "#A6ADB4",
          "on-footer": "#FFFFFF",
          primary: "#3545EE",
          secondary: "#52E5BA",
          "on-secondary": "#FFFFFF",
          accent: "#3545EE",
          error: "#d12f19",
          info: "#337ab7",
          success: "#529214",
          warning: "#FFF9C4",
          third: "#ebeded",
        },
      },
    },
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  defaults: {
    VTextField: {
      density: "compact",
      variant: "outlined",
    },
    VSelect: {
      density: "compact",
      variant: "outlined",
    },
    VTextarea: {
      density: "compact",
      variant: "outlined",
    },
    VFileInput: {
      density: "compact",
      variant: "outlined",
    },
    VAutocomplete: {
      density: "compact",
      variant: "outlined",
    },
    VBtn: {
      color: "secondary",
      variant: "flat",
      rounded: "xl",
      class: "px-5",
    },
    VCardActions: {
      VBtn: {
        color: "secondary",
        variant: "flat",
        rounded: "xl",
        class: "px-5",
      },
    },
    VCard: {
      rounded: "lg",
    },
    VList: {
      density: "compact",
      lines: "one",
    },
  },
});
