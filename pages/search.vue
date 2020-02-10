<template>
  <div class="bg-theme1">
    <h1>search page</h1>
    <h3>{{ type }}</h3>
    <h3>{{ key }}</h3>
    <h3>{{ data[type] }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  // layout: 'search',
  name: 'search',
  title: '검색',
  props: {
    // test: {
    //   type: String
    // }
  },
  components: {},
  computed: mapState(['checkObj']),
  watch: {
    $route (to, from) {
      if (!to.query.type) return;

      if (JSON.stringify(to.query) != JSON.stringify(from.query)) {
        this.type = to.query.type;
        this.key = to.query.key;
        this.getPCT(this.type, this.key);
      }
    }
  },
  data () {
    return {
      posts: this.$store.getters.posts,
      comments: this.$store.getters.comments,
      tags: this.$store.getters.tags,
      type: this.$route.query.type,
      key: this.$route.query.key,
      data: {
        posts: {},
        comments: {},
        tags: {}
      },
      HOME_PATH: process.env.HOME_PATH
    };
  },
  methods: {
    sleep (delay) {
      let start = new Date().getTime();
      while (new Date().getTime() < start + delay);
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
        }
      });
    },
    getTags () {
      let self  = this;
      let store = this.$store;
      let query = this.$route.query;

      store.dispatch('getTags', query.key).then((result) => {
        if (!result.check) {
          setTimeout(function () {
            self.getTags();
          }, 100);
        } else {
          self.tags = result.tags;

          if (query.key) {
            self.data.tags = result.tags[query.key];
          } else {
            self.data.tags = result.tags;
          }
        }
      });
    }
  },
  beforeCreate () {
  },
  beforeMount () {
    let query = this.$route.query;
    this.getPCT(query.type, query.key);
  }
};
</script>

<style>
</style>