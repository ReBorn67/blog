<template>
  <base-dropdown tag="div" class="nav-item"
    :class="[sub ? 'dropright sub-dropdown' : '']" 
  >
    <a slot="title" href="#" role="button" 
      :class="[sub ? 'dropdown-item' : 'nav-link']"
    >
      <i class="ni ni-collection d-lg-none"></i>
      <span class="nav-link-inner--text">{{ menu.title }}</span>
    </a>

    <tree-menus v-for="(item, k) in subMenus" :key="item.title" :menus="[item]" :sub="true" />
    <router-link v-for="(item, k) in linkMenus" :key="k" :menu="item" :to="item.path" class="dropdown-item">{{ item.title }}</router-link>
<!-- 
    <div v-for="(item, k) in menu.subTree" :key="k" :menu="item">
      <tree-menus v-if="!item.path" :menus="[item]" :sub="true" />

      <router-link v-else :to="item.path" class="dropdown-item">{{ item.title }}</router-link>
    </div>
 -->
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
      linkMenus: this.menu['subTree'].filter((item, index) => { return item.path; }),
      subMenus: this.menu['subTree'].filter((item, index) => { return !item.path; }),
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      console.log(this);
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

