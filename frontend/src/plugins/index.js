/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
import i18n from "./i18n";
import { createValidator } from "./validators";
import phoneInput from "./phoneInput";
import pinia from "../stores";
import router from "../router";

export function registerPlugins(app) {
  loadFonts();
  app.use(vuetify).use(pinia).use(i18n).use(phoneInput).use(createValidator(i18n)).use(router);
}
