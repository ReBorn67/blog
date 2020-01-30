<template>
    <header class="header-global sticky-top bg-dark">
        <base-nav id="header" class="navbar-main" type="" effect="dark" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/" @click.native="$store.commit('setSideMenus', false)">
                <img :src="HOME_PATH+'img/brand/white.png'" alt="logo">
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
                        <img :src="HOME_PATH+'img/brand/blue.png'">
                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <tree-menus :menus="menus" :sub="false" />

            <ul class="navbar-nav align-items-lg-center ml-lg-auto d-none">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.facebook.com/creativetim" target="_blank" rel="noopener"
                       data-toggle="tooltip" title="Like us on Facebook">
                        <i class="fa fa-facebook-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Facebook</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://www.instagram.com/creativetimofficial"
                       target="_blank" rel="noopener" data-toggle="tooltip" title="Follow us on Instagram">
                        <i class="fa fa-instagram"></i>
                        <span class="nav-link-inner--text d-lg-none">Instagram</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://twitter.com/creativetim" target="_blank" rel="noopener"
                       data-toggle="tooltip" title="Follow us on Twitter">
                        <i class="fa fa-twitter-square"></i>
                        <span class="nav-link-inner--text d-lg-none">Twitter</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-link-icon" href="https://github.com/creativetimofficial/vue-argon-design-system"
                       target="_blank" rel="noopener" data-toggle="tooltip" title="Star us on Github">
                        <i class="fa fa-github"></i>
                        <span class="nav-link-inner--text d-lg-none">Github</span>
                    </a>
                </li>
                <li class="nav-item d-none d-lg-block ml-lg-4">
                    <a href="https://www.creative-tim.com/product/vue-argon-design-system" target="_blank" rel="noopener"
                       class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon">
                  <i class="fa fa-cloud-download mr-2"></i>
                </span>
                        <span class="nav-link-inner--text">Download</span>
                    </a>
                </li>
            </ul>
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
            HOME_PATH: process.env.HOME_PATH
        };
    },
    methods: {
        handleScroll (event) {
            if (window.scrollY) {
                $('#header').addClass('bg-primary');
            } else {
                $('#header').removeClass('bg-primary');
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
.sub-dropdown {
}

.sub-dropdown .dropdown-menu {
}

.sub-dropdown .dropdown-menu:before {
    display: none;
}
</style>
