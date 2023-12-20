import { $v } from "../src/plugins/validators";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $v: typeof $v;
  }
}

export {};
