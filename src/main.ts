import singleSpaVue from 'single-spa-vue';
import { createApp, h } from 'vue';

import App from '@/App.vue';
import { registerComponents } from '@/utils';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        /*
         * Single-spa props are available on the "this" object. Forward them to your component as needed.
         * https://single-spa.js.org/docs/building-applications#lifecycle-props
         * if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
         *
         * name: this.name,
         * mountParcel: this.mountParcel,
         * singleSpa: this.singleSpa,
         */
      });
    },
  },
  handleInstance(app) {
    registerComponents(app);
  },
});

export const { mount } = vueLifecycles;
export const { unmount } = vueLifecycles;
