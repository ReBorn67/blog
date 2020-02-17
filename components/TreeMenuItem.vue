<template>
  <base-dropdown 
    :tag="subMenus.length ? 'div' : 'link'" class="nav-item"
    :class="[
      sub ? 'dropright sub-dropdown ml-2 ml-lg-0' : '',
      !subMenus.length ? 'mr-lg-0 w-100' : ''
    ]"
    @change="toggleMenu"
    :hideArrow="false"
  >
    <!-- <a 
      slot="title" href="#" role="button" 
      :class="[sub ? 'dropdown-item px-0 px-lg-3' : 'nav-link']"
    >
      <i :class="['fa font-weight-bold align-middle m-0 d-lg-none', isOpen ? 'fa-folder-open-o' : 'fa-folder-o']" aria-hidden="true"></i>
      <span class="nav-link-inner--text ml-1">{{ setUpperTitle(menu.title) }}</span>
    </a> -->

    <router-link 
      slot="title"
      :to="subMenus.length ? '#' : { name: 'list', query: { parent: menu.parent, sub: menu.title }}"
      :class="[sub ? 'dropdown-item px-0 px-lg-3' : 'nav-link']"
    >
      <i 
        :class="[
          'fa font-weight-bold align-middle m-0 d-lg-none', 
          isOpen && subMenus.length ? 'fa-folder-open-o' : 'fa-folder-o'
        ]"
        aria-hidden="true"
      ></i>
      <span class="nav-link-inner--text ml-1">{{ setUpperTitle(menu.title) }}</span>
    </router-link>

    <tree-menus v-for="(item, k) in subMenus" :key="item.title" :menus="[item]" :sub="true" />

    <router-link 
      v-for="(item, k) in linkMenus" 
      :key="k" 
      :menu="item" 
      to="" 
      class="dropdown-item px-0 px-lg-3 ml-2 ml-lg-0"
      @click.native="menuLinkEvent(item.path)"
    >
      <i class="fa fa-circle-o align-middle m-0 d-lg-none" aria-hidden="true"></i>
      <span class="nav-link-inner--text ml-1 text-primary">{{ item.title }}</span>
    </router-link>

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
  data () {
    return {
      linkMenus: this.menu['subTree'].filter((item, index) => { return !item.subTree; }),
      subMenus: this.menu['subTree'].filter((item, index) => { return item.subTree; }),
      isOpen: false,
    }
  },
  methods: {
    toggleMenu (isOpen) {
      this.isOpen = isOpen;
    },
    menuLinkEvent (path) {
      if ($('#header .collapse.navbar-collapse').hasClass('show')) {
        $('#mobile-menu-close').click();
      }

      this.$store.commit('setSideMenus', this.menu);

      this.$router.push({ path: path });
    },
    setUpperTitle (text) {
      let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

      if (check.test(text.charAt(0)) || text == 'etc') return text;

      if (text == 'php') return text.toUpperCase();

      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  },
  mounted () {
  },
}
</script>

