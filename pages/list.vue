<template>
  <div class="">
    <div class="section-shaped my-0">
      <div class="shape shape-style-1 shape-primary">
        <span v-for="n in 10" :key="n" :class="'span-'+randomNumber(15, true)+'0'"></span>
      </div>

      <div class="align-items-center">
        <div class="col px-0">
          <div class="row justify-content-center align-items-center">
            <div class="col text-center pt-lg">
              <h1 class="text-white">{{ parent }}</h1>
              <p class="lead text-white mt-4 mb-5">[{{ sub }}]</p>
            </div>
          </div>
        </div>
      </div>
    </div>

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
          <th scope="row" class="align-middle text-center">{{ item.index+1 }}</th>
          <td>
            <h6 class="font-weight-bold">{{ item.title }}</h6>

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
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['menus', 'sideMenus', 'routesMeta']),
  watch: {
    $route (to, from) {
    }
  },
  data () {
    return {
      route: this.$route,
      query: this.$route.query,

      parent: '',
      sub: '',
      list: [],
      page: this.$route.query.page ? this.$route.query.page : 1,
      pageSize: 15,
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
    createList () {
      let self     = this;
      let subMenus = this.sideMenus[0].subTree;
      let metas = this.routesMeta.metas[this.parent][this.sub];

      let sortMetasObj = Object.values(metas).sort(function (a, b) { 
        let a_TS = self.getTS(a.timestamp);
        let b_TS = self.getTS(b.timestamp);
        return a_TS < b_TS ? -1 : a_TS > b_TS ? 1 : 0;
      });

      let subMenusTitle = subMenus.map((menu) => { return menu.title });

      subMenus = sortMetasObj.map((obj, index) => {
        let subMenuIndex = subMenusTitle.indexOf(obj.title);
        let menu         = subMenus[subMenuIndex];

        menu['index']     = index;
        menu['tags']      = obj.tags;
        menu['timestamp'] = obj.timestamp;
        return menu;
      });

      let startNum = (this.page - 1) * this.pageSize;

      if (this.page * this.pageSize > subMenus.length) {
        subMenus = subMenus.slice(startNum);
      } else {
        subMenus = subMenus.slice(startNum, this.pageSize);
      }

      return subMenus;
    }
  },
  beforeCreate () {
  },
  beforeMount () {
    this.parent = this.sideMenus[0].parent;
    this.sub    = this.sideMenus[0].title;

    this.list = this.createList();
    console.log(this.list)
  }
};
</script>

<style>
</style>