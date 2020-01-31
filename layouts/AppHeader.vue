<template>
  <header class="header-global sticky-top bg-gradient-theme1">
    <base-nav id="header" class="navbar-main" type="" effect="dark" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/" @click.native="$store.commit('setSideMenus', false)">
        <img v-if="!isScrolled" :src="HOME_PATH+'img/brand/logo-white.png'" alt="logo">
        <img v-else="isScrolled" :src="HOME_PATH+'img/brand/logo-color.png'" alt="logo">
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
            <img :src="HOME_PATH+'img/brand/logo-color.png'">
          </a>
        </div>

        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <tree-menus :menus="menus" :sub="false" />
    </base-nav>
  </header>
</template>

<script>
import BaseNav from "~/baseComponents/BaseNav";
import CloseButton from "~/baseComponents/CloseButton";
import TreeMenus from "~/components/TreeMenus";

export default {
  components: {
    BaseNav,
    CloseButton,
    TreeMenus
  },
  props: {
    menus: {
      type: Array
    }
  },
  data () {
    return {
      HOME_PATH: process.env.HOME_PATH,
      isScrolled: false
    };
  },
  methods: {
    handleScroll (event) {
      this.isScrolled = window.scrollY;

      if (window.scrollY) {
        $('#header').parent('header').addClass('bg-white');
        $('#header').parent('header').removeClass('bg-gradient-theme1');

        $('#header').addClass('navbar-white');
        $('#header').removeClass('navbar-dark');

        $('#header').addClass('bg-lighter');

      } else {
        $('#header').parent('header').addClass('bg-gradient-theme1');
        $('#header').parent('header').removeClass('bg-white');

        $('#header').addClass('navbar-dark');
        $('#header').removeClass('navbar-white');

        $('#header').removeClass('bg-lighter');
      }
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeCreate () {
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
.navbar-brand img {
  height: 45px;
}

.sub-dropdown {
}

.sub-dropdown .dropdown-menu {
}

.sub-dropdown .dropdown-menu:before {
  display: none;
}

.navbar-white .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(101, 161, 181, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
