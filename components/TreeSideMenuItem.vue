<template>
  <div 
    :id="'accordion_'+menu.title"
    aria-multiselectable="true"
    :class="['pb-2 border-bottom border-dark', sub ? '' : 'mb-2 mr-2']"
  >
    <ul class="list-group">
      <div :id="'fake_collapse_'+menu.title+'_btn'">
        <li :class="titleClass" @click="menuFolderEvent($event)">
          <i :class="['fa font-weight-bold align-middle m-0', isOpen ? 'fa-folder-open-o' : 'fa-folder-o']" aria-hidden="true"></i>
          <span>{{ setUpperTitle(menu.title) }}</span>
        </li>
      </div>

      <div 
        :id="'real_collapse_'+menu.title+'_btn'"
        class="d-none" 
        data-toggle="collapse" 
        :data-target="'#collapse_'+menu.title" 
        aria-expanded="false" 
        :aria-controls="'collapse_'+menu.title"
      >
        <li :class="titleClass">
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

        <li
          v-if="item.path"
          v-for="(item, k) in linkMenus"
          :key="k"
          :menu="item"
          :class="linkItemClass + ' ml-2'"
          @click="menuLinkEvent(item.path)"
        >
          <span>{{ item.title }}</span>
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
  data () {
    return {
      titleClass: 'list-group-item cursor-pointer p-2 active bg-white border-0 text-dark',
      linkItemClass: 'list-group-item cursor-pointer p-2 border-0',
      subItemClass: 'list-group-item cursor-pointer border-0',

      linkMenus: this.menu['subTree'].filter((item, index) => { return item.path; }),
      subMenus: this.menu['subTree'].filter((item, index) => { return !item.path; }),

      isOpen: false,
      folder: false,
      isFolderClick: false,
      interval: false,
    }
  },
  methods: {
    menuFolderEvent (event, isOpen) {
      let self = this;

      let fakeBtn  = $('#fake_collapse_'+this.menu.title+'_btn');
      let realBtn  = $('#real_collapse_'+this.menu.title+'_btn');
      let collapse = $('#collapse_'+this.menu.title);

      if (!this.isFolderClick) {
        this.isFolderClick = true;

        this.isOpen = !this.isOpen;

        realBtn.click();

        setTimeout(function () {
          self.isFolderClick = false;
        }, 350);
      }
    },
    menuLinkEvent (path) {
      // this.$store.commit('setSideMenus', this.menu);

      this.$router.push({ path: path });
    },
    setUpperTitle (text) {
      let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

      if (check.test(text.charAt(0)) || text == 'etc') return text;

      if (text == 'php') return text.toUpperCase();

      return text.charAt(0).toUpperCase() + text.slice(1);
    }
  },
  beforeMount () {
  },
  mounted () {
  },
}
</script>

