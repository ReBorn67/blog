import Vue from 'vue';

import "~/assets/vendor/nucleo/css/nucleo.css";
import "~/assets/vendor/font-awesome/css/font-awesome.min.css";
import "~/assets/scss/argon.scss";
import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false;

export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(VueLazyload);
  }
};
