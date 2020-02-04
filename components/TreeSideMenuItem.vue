<template>
  <div 
    :id="'accordion_'+menu.title"
    aria-multiselectable="true"
    :class="['pb-2 border-bottom border-dark', sub ? '' : 'mb-2 mr-2']"
  >
    <ul class="list-group">
      <div data-toggle="collapse" :data-target="'#collapse_'+menu.title" aria-expanded="false" :aria-controls="'collapse_'+menu.title">
        <li :class="titleClass" @click="menuFolderEvent($event)">
          <i :class="['fa font-weight-bold align-middle m-0', isOpen ? 'fa-folder-open-o' : 'fa-folder-o']" aria-hidden="true"></i>
          <span>{{ setUpperTitle(menu.title) }}</span>
        </li>
      </div>

      <div :id="'collapse_'+menu.title" class="collapse" :data-parent="'#accordion_'+menu.title">
        <li 
          v-for="(item, k) in subMenus" 
          :menu="item" 
          :class="[
            subItemClass, k == 0 ? 
              (subMenus.length == 1 ? 'pl-2 pr-0 pt-2 pb-1' : 'pl-2 pr-0 py-2') : 
              'pl-2 pr-0 pt-0 pb-2'
          ]"
        >
          <tree-side-menus :menus="[item]" :sub="true" />
        </li>

        <li v-for="(item, k) in linkMenus" :key="k" :menu="item" :class="linkItemClass + ' ml-2'" v-if="item.path">
          <router-link to="" @click.native="menuLinkEvent(item.path)">
            <span>{{ item.title }}</span>
          </router-link>
        </li>

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
      titleClass: 'list-group-item cursor-pointer p-2 active bg-white border-0 text-dark',
      linkItemClass: 'list-group-item cursor-pointer p-2 border-0',
      subItemClass: 'list-group-item cursor-pointer border-0',

      linkMenus: this.menu['subTree'].filter((item, index) => { return item.path; }),
      subMenus: this.menu['subTree'].filter((item, index) => { return !item.path; }),

      isOpen: false,
      isFolderClick: false
    }
  },
  methods: {
    menuFolderEvent (event) {
      event.preventDefault();

      if (!this.isFolderClick) {
        this.isFolderClick = true;

        let self = this;

        let checker = setInterval(function() {
          let div  = $(event.target).parents('[aria-expanded]');
          let attr = div.attr('aria-expanded');
          console.log(div);
          console.log(attr);
          console.log('check');

          if ((!self.isOpen).toString() === attr) {
            self.isOpen = !self.isOpen;

            self.isFolderClick = false;

            console.log(self.isOpen);
            console.log('clear');

            clearInterval(checker);
          }
        }, 100);
      }
    },
    menuLinkEvent (path) {
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
  mounted() {
  },
}
</script>

