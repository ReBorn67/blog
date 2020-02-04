<template>
  <header class="header-global sticky-top bg-gradient-theme1">
    <base-nav id="header" class="navbar-main" type="" effect="dark" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/" @click.native="$store.commit('setSideMenus', false)">
        <img :src="HOME_PATH+'img/brand/logo-white.png'" alt="logo">
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <router-link slot="brand" class="navbar-brand mr-lg-5" to="/" @click.native="menuClickEvent">
            <img :src="HOME_PATH+'img/brand/logo-color.png'">
          </router-link>
        </div>

        <div class="col-6 collapse-close">
          <close-button id="mobile-menu-close" @click="closeMenu"></close-button>
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
        $('#header').parent('header').addClass('bg-gradient-theme3');
        $('#header').parent('header').removeClass('bg-gradient-theme1');

      } else {
        $('#header').parent('header').addClass('bg-gradient-theme1');
        $('#header').parent('header').removeClass('bg-gradient-theme3');
      }
    },
    menuClickEvent () {
      if ($('#header .collapse.navbar-collapse').hasClass('show')) {
        $('#mobile-menu-close').click();
      }
      
      this.$store.commit('setSideMenus', false);
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
</style>
