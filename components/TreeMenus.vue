<template>
    <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <tree-menu-item 
            v-for="(menu, i) in menus" 
            :key="i"
            :menu="menu"
            :sub="sub"
        />
    </ul>
</template>

<script>
export default {
  name: 'tree-menus',
  components: {
    TreeMenuItem: () => import('./TreeMenuItem.vue')
  },
  props: {
    menus: {
      type: Array,
      required: true
    },
    sub: {
        type: Boolean
    }
  },
  mounted () {
  }
};
</script>