<template>
  <div class="bg-theme1">
    <h1>search page</h1>
    <h3>{{ type }}</h3>
    <h3>{{ key }}</h3>
    <h3>{{ data }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  layout: 'search',
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
      if (JSON.stringify(to.query) != JSON.stringify(from.query)) {
        this.getTags();
      }
    }
  },
  data () {
    return {
      tags: this.$store.getters.tags,
      type: this.$route.query.type,
      key: this.$route.query.key,
      data: {},
      HOME_PATH: process.env.HOME_PATH
    };
  },
  methods: {
    sleep (delay) {
      let start = new Date().getTime();
      while (new Date().getTime() < start + delay);
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
          self.data = result.tags[query.key];
        }
      });
    }
  },
  beforeCreate () {
  },
  beforeMount () {
    this.getTags();
  }
};
</script>

<style>
</style>