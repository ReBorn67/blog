<template>
  <div id="app">
    <app-header name="header" :menus="menus"></app-header>

    <main class="mt-4">
      <div class="container">
        <div class="row">
          <fade-transition class="col" origin="center" mode="out-in" :duration="250">
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
import { mapState } from 'vuex';

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppLeftSide from "./AppLeftSide";
import AppFloatButtons from "./AppFloatButtons";
import { FadeTransition } from "vue2-transitions";

import deepmerge from 'deepmerge';

export default {
  components: {
    AppHeader,
    AppFooter,
    AppFloatButtons,
    FadeTransition
  },
  computed: mapState(['sideMenus', 'checkObj']),
  watch: {
  },
  data () {
    return {
      menus: {},
    };
  },
  methods: {
    createMenu (pathTotalArr, obj, path) {
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
            path: [path, title].join('/')
          });

        } else {
          obj['subTree'].push({
            title: title,
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
          self.createMenu(item, obj['subTree'][index], newPath);
        }
      });

      return obj;
    },
    getMenus () {
      let routes = this.$router.options.routes;
      let pathTotalArr = {};

      pathTotalArr = routes.filter((item) => { return item.path.match(/\//g).length > 1; });
      pathTotalArr = pathTotalArr.map((item) => { return item.path.substring(1).split('/'); });

      let menus = {
        title: 'root',
        subTree: []
      };

      let res = this.createMenu(pathTotalArr, menus, '');

      return res.subTree;
    },
    setTags () {
      this.$store.dispatch('setTags', this.$router.options.routes);
    },
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
    this.menus = this.getMenus();
    this.setTags();
  },
  mounted () {
  }
};
</script>

<style>
</style>
