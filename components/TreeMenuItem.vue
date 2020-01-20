<template>
    <base-dropdown tag="li" class="nav-item"  :class="{'dropright sub-dropdown': sub}">
        <a slot="title" href="#" :class="[sub ? 'dropdown-item' : 'nav-link']" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">{{ menu.title }}</span>
        </a>

        <div v-for="(item, k) in menu.subTree" :key="k" :menu="item">
            <tree-menus v-if="!item.path" :menus="[item]" :sub="true" />

            <router-link v-else :to="item.path" class="dropdown-item">{{ item.title }}</router-link>
        </div>
    </base-dropdown>
</template>

<script>
export default {
  name: 'tree-menu-item',
  components: {
    TreeMenus: () => import('./TreeMenus.vue')
  },
  props: {
    menu: {
      type: Object,
      required: true
    },
    sub: {
        type: Boolean
    }
  },
  data() {
    return {
      open: true
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
  }
}
</script>

