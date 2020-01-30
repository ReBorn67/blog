<template>
  <div id="app">
    <app-header name="header" :menus="menus"></app-header>

    <main class="mt-4">
      <div class="container">
        <div class="row">
          <component :class="['d-none', sideMenus.length ? 'd-lg-block' : '']" :is="sideMenusView" :menus="sideMenus"></component>

          <fade-transition :class="['col ml-auto', sideMenusLength ? 'col-lg-9' : '']" origin="center" mode="out-in" :duration="250">
            <div id="content"><nuxt /></div>
          </fade-transition>
        </div>
      </div>
    </main>

    <app-footer name="footer"></app-footer>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppLeftSide from "./AppLeftSide";
import { FadeTransition } from "vue2-transitions";

import deepmerge from 'deepmerge';

export default {
  components: {
    AppHeader,
    AppFooter,
    FadeTransition
  },
  computed: mapState(['sideMenus']),
  watch: {
    sideMenus (sideMenus) {
      console.log(sideMenus);
      let AppLeftSide = () => import("./AppLeftSide");

      this.sideMenusView = AppLeftSide;
      this.sideMenusLength = sideMenus.length;
    }
  },
  data () {
    return {
      menus: {},
      sideMenusView: '',
      sideMenusLength: 0
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

      pathTotalArr = routes.filter((item) => { return item.path != '/' });
      pathTotalArr = pathTotalArr.map((item) => { return item.path.substring(1).split('/'); });

      let menus = {
        title: 'root',
        subTree: []
      };

      let res = this.createMenu(pathTotalArr, menus, '');

      return res.subTree;
    },
    setSubMenus (menus) {
      let path = this.$router.currentRoute.path;
      console.log(path);

      if (path.substring(1) == '') {
        return false;
      }

      let split = path.substring(1).split('/');
      split.pop();

      let clone = [deepmerge([], menus)];

      let result = {
        title: '',
        subTree: false
      }

      split.forEach(function(title, index) {
        clone[index].some((item, idx) => {
          if (item.title == title) {
            result.title = title;
            clone.push(item.subTree);
            return true;
          }
        });
      });

      result.subTree = clone.pop();

      return result;
    }
  },
  beforeMount () {
    this.menus = this.getMenus();

    let subMenus = this.setSubMenus(this.menus);
    this.$store.commit('setSideMenus', subMenus);
  },
  mounted () {
  }
};
</script>

<style>
</style>
