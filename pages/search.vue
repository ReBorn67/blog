<template>
  <div class="">
    <div id="pageHeader" class="section-shaped my-0 shadow">
      <div class="shape shape-style-1 shape-primary">
        <span v-for="n in 10" :key="n" :class="'span-'+randomNumber(15, true)+'0'"></span>
      </div>

      <div class="align-items-center">
        <div class="col px-0">
          <div class="row justify-content-center align-items-center">
            <div class="col text-center pt-lg">
              <h1 class="text-white">{{ type ? setUpperTitle(type) : 'Search' }}</h1>
              <p class="lead text-white mt-4 mb-5">{{ key ? '['+setUpperTitle(key)+']' : '&nbsp;' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="tagsWrap" class="my-4">
      <div class="d-flex mb-4">
        <icon name="fa fa-tags" type="theme5" rounded to="/search?type=tags"></icon>
        <h6 class="mb-0 ml-4 align-self-center">
          <router-link :to="'/search?type=tags'" class="text-theme5">태그</router-link>
        </h6>
      </div>

      <div class="d-flex flex-wrap">
        <router-link
          v-for="(item, tag) in tags" 
          :key="tag" 
          :to="'/search?type=tags&key='+tag" 
          class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5"
        >
          <span>{{ tag }}</span>
        </router-link>
      </div>
    </div>

    <!-- view table after select tag -->
    <div v-if="false" id="tagTable" class="shadow">
      <table class="table table-sm table-hover my-4">
        <thead class="bg-theme3 text-white">
          <tr>
            <th scope="col" class="text-center">#</th>
            <th scope="col">Title</th>
            <th scope="col" class="text-center">date</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in data[type]" :key="index">
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

    <component :is="tableView" :list="list"></component>

    <component :is="paginationView" :pagiObject="pagiObject" :path="'search'" :searchType="type" :searchKey="key"></component>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['sideMenus', 'routesMeta', 'pageSize', 'pageLeftSize', 'pageRightSize']),
  watch: {
    $route (to, from) {
      this.type = to.query.type;
      this.key  = to.query.key;

      if (!to.query.type) return;

      if (JSON.stringify(to.query) != JSON.stringify(from.query)) {
        this.getPCT(this.type, this.key);
      }
    },
    data (data) {
      console.log(data);
    },
    pagiObject (pagiObject) {
      let tableView      = () => import("~/components/List/TagTable");
      let paginationView = () => import("~/components/List/Pagination");

      this.tableView      = tableView;
      this.paginationView = paginationView;
    }
  },
  data () {
    return {
      posts: this.$store.getters.posts,
      // comments: this.$store.getters.comments,
      tags: this.$store.getters.tags,

      type: this.$route.query.type,
      key: this.$route.query.key,

      data: {
        posts: {},
        // comments: {},
        tags: {}
      },

      listObject: {},
      pagiObject: {},
      list: [],
      page: this.$route.query.page ? this.$route.query.page : 1,

      tableView: '',
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
    sleep (delay) {
      let start = new Date().getTime();
      while (new Date().getTime() < start + delay);
    },
    setUpperTitle (text) {
      let check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

      if (check.test(text.charAt(0)) || text == 'etc') return text;

      if (text == 'php') return text.toUpperCase();

      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    getPCT (type, key) {
      let self  = this;
      let store = this.$store;

      if (type == 'comments') return;

      store.dispatch('getPCT', type, key).then((result) => {
        if (!result.check) {
          setTimeout(function () {
            self.getPCT(type, key);
          }, 100);

        } else {
          self[type] = result.datas;

          if (key) {
            self.data[type] = result.datas[key];
          } else {
            self.data[type] = result.datas;
          }

          this.listObject = this.createListObject(type);
          this.pagiObject = this.createPagingObject(this.listObject);

          this.list = this.listObject.currentList;

          console.log(this.listObject)
          console.log(this.pagiObject)
        }
      });
    },
    createListObject (type) {
      let self    = this;
      let oriList = this.data[type];
      let subList = false;
      // let metas    = false;

      // if (this.parent == this.sub) {
      //   metas = this.routesMeta.metas[this.parent];
      // } else {
      //   metas = this.routesMeta.metas[this.parent][this.sub];
      // }

      /* sort DESC */
      let sortList = Object.values(oriList).sort(function (a, b) { 
        let a_TS = self.getTS(a.timestamp);
        let b_TS = self.getTS(b.timestamp);
        return a_TS > b_TS ? -1 : a_TS < b_TS ? 1 : 0;
      });

      /* set list */
      // let subListTitle = oriList.map((menu) => { return menu.title });

      subList = sortList.map((object, index) => {
        object['index'] = index;

        return object;
      });

      /* set list per page */
      let startNum = (this.page - 1) * this.pageSize;

      if (this.page * this.pageSize > subList.length) {
        subList = subList.slice(startNum);
      } else {
        subList = subList.slice(startNum, startNum + this.pageSize);
      }

      let listObject = {
        totalCount: oriList.length,
        totalPage: Math.ceil(oriList.length / this.pageSize),
        currentPage: this.page*1,
        pageSize: this.pageSize*1,
        currentList: subList,
        totalList: oriList
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
    let query = this.$route.query;

    if (query.type) {
      this.getPCT(query.type, query.key);

    } else {
      this.getPCT('posts');
      this.getPCT('tags');
    }
  }
};
</script>

<style>
</style>