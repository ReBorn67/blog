<template>
  <div id="app">
    <app-header name="header" :menus="menus"></app-header>
    <!-- <component :is="menusView" :menus="menus"></component> -->

    <main class="mt-4">
      <div class="container">
        <div class="row">
          <component 
            :class="[
              'd-none', 
              sideMenus.length && currentRoute.name !== 'search' ? 'd-lg-block' : ''
            ]" 
            :is="sideMenusView" 
            :menus="sideMenus"
          >
          </component>

          <fade-transition :class="['col ml-auto', sideMenus.length && currentRoute.name !== 'search' ? 'col-lg-9' : '']" origin="center" mode="out-in" :duration="250">
            <div id="content"><nuxt /></div>
          </fade-transition>
        </div>
      </div>
    </main>

    <app-footer name="footer" :checkPosts="checkObj.posts" :checkCommnets="checkObj.commnets" :checkTags="checkObj.tags"></app-footer>

    <app-float-buttons></app-float-buttons>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

import AppHeader from "./includes/AppHeader";
import AppFooter from "./includes/AppFooter";
// import AppLeftSide from "./includes/AppLeftSide";
import AppFloatButtons from "./includes/AppFloatButtons";
import { FadeTransition } from "vue2-transitions";

import deepmerge from 'deepmerge';

let loadingComponent = new Vue({
  template: '<div class="spinner-grow text-theme1 align-self-center"><span class="sr-only">Loading...</span></div>',
});

export default {
  components: {
    AppHeader,
    AppFooter,
    AppFloatButtons,
    FadeTransition
  },
  computed: mapState(['menus', 'sideMenus', 'checkObj']),
  watch: {
    menus (menus) {
      let AppHeader = () => import("./includes/AppHeader");

      this.menusView = AppHeader;
    },
    sideMenus (sideMenus) {
      let AppLeftSide = () => import("./includes/AppLeftSide");

      this.sideMenusView = AppLeftSide;
    },
    $route (to, from) {
      this.currentRoute = to;

      if (to.name == 'search') {
        this.$store.commit('setSideMenus', { title: '', subTree: [] });

      } else if (to.path.substring(1) == 'list' && to.query.parent !== from.query.parent) {
        let sideMenus = this.setSideMenus(this.menus);
        this.$store.commit('setSideMenus', sideMenus);

      } else if (
        typeof this.sideMenus[0] == 'undefined' || 
        this.sideMenus[0].title !== to.path.substring(1)
      ) {
        let sideMenus = this.setSideMenus(this.menus);
        this.$store.commit('setSideMenus', sideMenus);
      }
    }
  },
  data () {
    return {
      currentRoute: this.$router.currentRoute,
      // menus: {},
      menusView: '',
      sideMenusView: ''
    };
  },
  methods: {
    createMenu (pathTotalArr, obj, path, parent) {
      if (!pathTotalArr.length) return true;

      let clone = deepmerge([], pathTotalArr);
      let self  = this;
      let sub   = [];

      clone.map((pathArr, index) => {
        let title = pathArr[0];

        if (title.substring(title.length-1) == '?') {
          title = title.substring(0, title.length-1);
        }

        if (pathArr.length == 1) {
          obj['subTree'].push({
            title: title,
            parent: parent,
            path: [path, title].join('/')
          });

        } else {
          obj['subTree'].push({
            title: title,
            parent: parent,
            subTree: []
          });
        }

        let parentIndex = -1;

        obj['subTree'] = obj['subTree'].map((item) => { return JSON.stringify(item); });
        obj['subTree'] = obj['subTree'].filter((item, index) => { return obj['subTree'].indexOf(item) === index; });
        obj['subTree'] = obj['subTree'].map((item) => { return JSON.parse(item); });

        obj['subTree'].forEach(function(item, index) {
          if (item.title == title) {
            parentIndex = index;
            return true;
          }
        });

        if(typeof sub[parentIndex] !== 'object') {
          sub[parentIndex] = [];
        }

        pathArr.shift();

        if (!pathArr.length) {
          return false;
        } else {
          sub[parentIndex].push(pathArr);
          return pathArr;
        }
      });

      /* back to etc, example */

      let sortTitle = ['etc', 'example'];
      let sortObj  = [];
      let sortSub  = [];

      let objClone = deepmerge([], obj['subTree']);
      let subClone = deepmerge([], sub);

      objClone.map((item, index) => {
        let idx = -1;

        if ((idx = sortTitle.indexOf(item.title)) > -1) {
          sortObj[idx] = item;
          sortSub[idx] = subClone[index];
          objClone[index] = false;
          subClone[index] = false;
        }
      });

      objClone = objClone.filter((item) => { return item; });
      obj['subTree'] = deepmerge(objClone, sortObj);
      subClone = subClone.filter((item) => { return item; });
      sub = deepmerge(subClone, sortSub);

      /* recursive */

      sub.forEach(function(item, index) {
        if (item.length) {
          let newPath = [path, obj['subTree'][index]['title']].join('/');
          self.createMenu(item, obj['subTree'][index], newPath, parent);
        }
      });

      return obj;
    },
    getMenus () {
      let self         = this;
      let routes       = this.$router.options.routes;
      let pathTotalArr = {};
      let parents      = [];
      let result       = [];

      pathTotalArr = routes.filter((item) => { return item.path.match(/\//g).length > 1; });
      pathTotalArr = pathTotalArr.map((item) => { return item.path.substring(1).split('/'); });

      let menus = {
        title: 'root',
        subTree: []
      };

      parents = pathTotalArr.map((item) => { return item[0]; });
      parents = parents.filter((item, index) => { return parents.indexOf(item) === index; });

      /* back to etc, example */

      let sortTitle = ['etc', 'example'];
      let sortObj  = [];

      let objClone = deepmerge([], parents);

      objClone.map((item, index) => {
        let idx = -1;

        if ((idx = sortTitle.indexOf(item)) > -1) {
          sortObj[idx] = item;
          objClone[index] = false;
        }
      });

      objClone = objClone.filter((item) => { return item; });
      parents  = deepmerge(objClone, sortObj);

      parents.forEach(function(parent, index) {
        let child = pathTotalArr.filter((item) => { if (item[0] == parent) return item[0]; });
        let tmp = {
          title: parent,
          subTree: []
        };
        result.push(self.createMenu(child, tmp, '', parent).subTree.pop());
      });

      return result;
    },
    setSideMenus (menus) {
      let path = this.$router.currentRoute.path.substring(1);

      if (path == '') {
        return false;

      } else if (path == 'list') {
        let query  = this.$route.query;
        let parent = query.parent;
        let sub    = query.sub;

        let result = menus.filter((menu) => { if (menu.title == parent) return menu; }).pop();

        if (parent !== sub) {
          result = result.subTree.filter((menu) => { if (menu.title == sub) return menu; }).pop();
        }

        return result;
      }

      let split = path.split('/');
      split.pop();

      let clone = [deepmerge([], menus)];

      let result = {
        title: '',
        parent: '',
        subTree: false
      }

      split.forEach(function(title, index) {
        clone[index].some((item, idx) => {
          if (item.title == title) {
            result.title = title;
            result.parent = item.parent;
            clone.push(item.subTree);
            return true;
          }
        });
      });

      result.subTree = clone.pop();

      return result;
    },
    setPCT () {
      this.$store.dispatch('setPCT', this.$router.options.routes);
    }
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    if (!this.menus.length) {
      let menus = this.getMenus();
      this.$store.commit('setMenus', menus);

      let sideMenus = this.setSideMenus(this.menus);
      this.$store.commit('setSideMenus', sideMenus);
      
      this.setPCT();
    }
  },
  mounted () {
  }
};
</script>

<style>
</style>
