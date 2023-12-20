import { createI18n } from "vue-i18n";
import pinia from "../stores";
import { useLocaleStore } from "../stores/localeStore";
// TODO : Lazy load language files https://kazupon.github.io/vue-i18n/guide/lazy-loading.html
import fr from "../locales/fr.json";
import en from "../locales/en.json";

const localeStore = useLocaleStore(pinia);
const i18n = createI18n({
  legacy: false,
  locale: localeStore.locale,
  fallbackLocale: "en",
  silentFallbackWarn: true,
  messages: { fr, en },
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
        maximumSignificantDigits: 5,
      },
      percent: {
        style: "percent",
        useGrouping: false,
      },
    },
    fr: {
      currency: {
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
        maximumSignificantDigits: 5,
      },
      percent: {
        style: "percent",
        useGrouping: false,
      },
    },
    de: {
      currency: {
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
        maximumSignificantDigits: 5,
      },
      percent: {
        style: "percent",
        useGrouping: false,
      },
    },
    nl: {
      currency: {
        style: "currency",
        currency: "EUR",
        currencyDisplay: "symbol",
        maximumSignificantDigits: 5,
      },
      percent: {
        style: "percent",
        useGrouping: false,
      },
    },
  },
  datetimeFormats: {
    en: {
      short: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      },
    },
    fr: {
      short: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      },
    },
    de: {
      short: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      },
    },
    nl: {
      short: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
      },
    },
  },
});
localeStore.$subscribe((mutation, state) => (i18n.global.locale.value = state.locale));

export default i18n;
