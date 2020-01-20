<template>
    <aside id="left-side" class="col-lg-3 d-none d-lg-block" :style="{ marginTop: marginTop+'px' }">
        <nav class="navbar-light">
            <tree-side-menus :menus="menus" :sub="false" />
        </nav>
    </aside>
</template>

<script>
import BaseNav from "~/baseComponents/BaseNav";
import BaseDropdown from "~/baseComponents/BaseDropdown";
import CloseButton from "~/baseComponents/CloseButton";
import TreeSideMenus from "~/components/TreeSideMenus";

export default {
    components: {
        BaseNav,
        CloseButton,
        BaseDropdown,
        TreeSideMenus
    },
    props: {
        menus: {
            type: Array
        }
    },
    data () {
        return {
            HOME_PATH: process.env.HOME_PATH,
            marginTop: window.scrollY
        };
    },
    methods: {
        handleLeftSide (event) {
            this.marginTop = $('#content').outerHeight() - 700 < window.scrollY ? $('#content').outerHeight() - 700 : window.scrollY;
        }
    },
    mounted () {
    },
    created () {
        window.addEventListener('scroll', this.handleLeftSide);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleLeftSide);
    }
};
</script>

<style>
#left-side {
    font-size: smaller;
}

#left-side nav {
    max-height: 700px;
    overflow-y: auto;
}

.link {
}

.cursor-pointer {
    cursor: pointer;
}
</style>
