<template>
  <div :id="[sub ? '' : 'left-side-menus']">
    <tree-side-menu-item 
      v-for="(menu, i) in menus" 
      :key="i"
      :menu="menu"
      :sub="sub"
    />
  </div>
</template>

<script>
export default {
  name: 'tree-side-menus',
  components: {
    TreeSideMenuItem: () => import('./TreeSideMenuItem.vue')
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