<template>
  <div 
    :id="'accordion_'+menu.title"
    aria-multiselectable="true"
    :class="['pb-2 border-bottom border-dark', sub ? '' : 'mb-2 mr-2']"
  >
    <ul class="list-group">
      <div data-toggle="collapse" :data-target="'#collapse_'+menu.title" aria-expanded="true" :aria-controls="'collapse_'+menu.title">
        <li :class="titleClass">{{ menu.title }}</li>
      </div>

      <div :id="'collapse_'+menu.title" class="collapse" :data-parent="'#accordion_'+menu.title">
        <li 
          v-for="(item, k) in subMenus" 
          :menu="item" 
          :class="[
            subItemClass, k == 0 ? 
              subMenus.length == 1 ? 'pl-2 pr-0 pt-2 pb-1' : 'pl-2 pr-0 py-2' : 
              'pl-2 pr-0 pt-0 pb-2'
          ]"
        >
          <tree-side-menus :menus="[item]" :sub="true" />
        </li>

        <li v-for="(item, k) in linkMenus" :key="k" :menu="item" :class="linkItemClass + ' ml-2'" v-if="item.path">{{ item.title }}</li>

      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tree-side-menu-item',
  components: {
    TreeSideMenus: () => import('./TreeSideMenus.vue')
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
      titleClass: 'list-group-item cursor-pointer p-2 active bg-gray border-0',
      linkItemClass: 'list-group-item cursor-pointer p-2 border-0',
      subItemClass: 'list-group-item cursor-pointer border-0',

      linkMenus: this.menu['subTree'].filter((item, index) => { return item.path; }),
      subMenus: this.menu['subTree'].filter((item, index) => { return !item.path; }),
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

