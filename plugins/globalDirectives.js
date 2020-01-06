import Vue from 'vue';

import clickOutside from "../directives/click-outside.js";

/**
 * You can register global directives here and use them as a plugin in your main Vue instance
 */

const GlobalDirectives = {
  install(Vue) {
    Vue.directive("click-outside", clickOutside);
  }
};

export default GlobalDirectives;