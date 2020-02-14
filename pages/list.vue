<template>
  <div class="">
    <div id="pageHeader" class="section-shaped my-0">
      <div class="shape shape-style-1 shape-primary">
        <span v-for="n in 10" :key="n" :class="'span-'+randomNumber(15, true)+'0'"></span>
      </div>

      <div class="align-items-center">
        <div class="col px-0">
          <div class="row justify-content-center align-items-center">
            <div class="col text-center pt-lg">
              <h1 class="text-white">{{ parent }}</h1>
              <p class="lead text-white mt-4 mb-5">{{ parent != sub ? '['+sub+']' : '&nbsp;' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <component :is="tableView" :list="list"></component> -->

    <div id="listTable">
      <table class="table table-sm table-hover my-4">
        <thead class="bg-theme3 text-white">
          <tr>
            <th scope="col" class="text-center">#</th>
            <th scope="col">Title</th>
            <th scope="col" class="text-center">date</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <th scope="row" class="align-middle text-center">{{ item.index + 1 }}</th>
            <td>
              <h6 class="font-weight-bold">
                <router-link
                  class="text-dark"
                  :to="item.path" 
                >
                  <span>{{ item.title }}</span>
                </router-link>
              </h6>

              <small class="blockquote-footer text-theme2">
                <i class="fa fa-tags" aria-hidden="true"></i>

                <router-link
                  v-for="(tag, tagIndex) in item.tags.split(',')" 
                  :key="tag" 
                  :to="'/search?type=tags&key='+tag" 
                  class="text-theme2 font-italic"
                >
                  <span v-if="tagIndex == item.tags.split(',').length - 1">{{ tag }}</span>
                  <span v-else>{{ tag }}, </span>
                </router-link>
              </small>
            </td>
            <td class="align-middle text-center">{{ item.timestamp }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <component :is="paginationView" :pagiObject="pagiObject" :parent="parent" :sub="sub"></component>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['menus', 'sideMenus', 'routesMeta']),
  watch: {
    $route (to, from) {
      this.parent = this.sideMenus[0].parent;
      this.sub    = this.sideMenus[0].title;
      this.page   = to.query.page ? to.query.page : 1;

      this.listObject = this.createListObject();
      this.pagiObject = this.createPagingObject(this.listObject);

      if (this.pagiObject.currentPage > this.pagiObject.totalPage) {
        this.$router.push({ name: 'list', query: { parent: this.parent, sub: this.sub, page: 1 }});
      }

      this.list = this.listObject.currentList;
    },
    pagiObject (pagiObject) {
      let paginationView = () => import("~/components/Pagination");

      this.paginationView = paginationView;
    }
  },
  data () {
    return {
      route: this.$route,
      query: this.$route.query,

      parent: '',
      sub: '',
      listObject: {},
      pagiObject: {},
      list: [],
      page: this.$route.query.page ? this.$route.query.page : 1,
      pageSize: this.$store.state.pageSize,
      pageLeftSize: this.$store.state.pageLeftSize,
      pageRightSize: this.$store.state.pageRightSize,

      paginationView: ''
    };
  },
  methods: {
    randomNumber (size, toZero) {
      let number = Math.floor(Math.random() * size);
      if (!toZero) number++;
      return number;
    },
    getTS (date) {
      if (date) return new Date(date).getTime();
      else new Date().getTime();
    },
    createListObject () {
      let self     = this;
      let oriMenus = this.sideMenus[0].subTree;
      let subMenus = false;
      let metas    = false;

      if (this.parent == this.sub) {
        metas = this.routesMeta.metas[this.parent];
      } else {
        metas = this.routesMeta.metas[this.parent][this.sub];
      }

      /* sort DESC */
      let sortMetasObj = Object.values(metas).sort(function (a, b) { 
        let a_TS = self.getTS(a.timestamp);
        let b_TS = self.getTS(b.timestamp);
        return a_TS > b_TS ? -1 : a_TS < b_TS ? 1 : 0;
      });

      /* set list */
      let subMenusTitle = oriMenus.map((menu) => { return menu.title });

      subMenus = sortMetasObj.map((obj, index) => {
        let subMenuIndex = subMenusTitle.indexOf(obj.title);
        let menu         = oriMenus[subMenuIndex];

        menu['index']     = index;
        menu['tags']      = obj.tags;
        menu['timestamp'] = obj.timestamp;

        return menu;
      });

      /* set list per page */
      let startNum = (this.page - 1) * this.pageSize;

      if (this.page * this.pageSize > subMenus.length) {
        subMenus = subMenus.slice(startNum);
      } else {
        subMenus = subMenus.slice(startNum, startNum + this.pageSize);
      }

      let listObject = {
        totalCount: oriMenus.length,
        totalPage: Math.ceil(oriMenus.length / this.pageSize),
        currentPage: this.page*1,
        pageSize: this.pageSize,
        currentList: subMenus,
        totalList: oriMenus
      };

      return listObject;
    },
    createPagingObject (listObject) {
      let startIndex    = 0;
      let endIndex      = 0;
      let currentPage   = listObject.currentPage;
      let totalPage     = listObject.totalPage;
      let pageLeftSize  = this.pageLeftSize;
      let pageRightSize = this.pageRightSize;
      let pageCount     = 1 + (pageLeftSize + pageRightSize);
      let viewSideBtn   = false;

      if (listObject.currentPage < pageRightSize + 1) {
        startIndex = 1;
        endIndex   = pageCount;

      } else if (listObject.totalPage - pageLeftSize < listObject.currentPage) {
        startIndex = listObject.totalPage - (pageLeftSize + pageRightSize);
        endIndex   = listObject.totalPage;

      } else {
        startIndex = listObject.currentPage - pageLeftSize;
        endIndex   = listObject.currentPage + pageRightSize;
      }

      if (pageCount < totalPage) {
        viewSideBtn = true;
      }

      let pagiObject = {
        startIndex: startIndex,
        endIndex: endIndex,
        currentPage: currentPage,
        totalPage: totalPage,
        pageLeftSize: pageLeftSize,
        pageRightSize: pageRightSize,
        pageCount: pageCount,
        viewSideBtn: viewSideBtn
      }

      return pagiObject;
    }
  },
  beforeCreate () {
  },
  beforeMount () {
    this.parent = this.sideMenus[0].parent;
    this.sub    = this.sideMenus[0].title;

    this.listObject = this.createListObject();
    this.pagiObject = this.createPagingObject(this.listObject);

    if (this.pagiObject.currentPage > this.pagiObject.totalPage) {
      this.$router.push({ name: 'list', query: { parent: this.parent, sub: this.sub, page: 1 }});
    }

    this.list = this.listObject.currentList;
  }
};
</script>

<style>
</style>