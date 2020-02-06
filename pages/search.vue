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
    tags (checkObj) {
      console.log(checkObj);
    }
  },
  data () {
    console.log('data')
    return {
      tags: this.$store.getters.tags,
      type: this.$route.query.type,
      key: this.$route.query.key,
      data: {},
      HOME_PATH: process.env.HOME_PATH
    };
  },
  methods: {
  },
  beforeCreate () {
    let self  = this;
    let store = this.$store;
    let query = this.$route.query;

    function sleep (delay) {
      var start = new Date().getTime();
      while (new Date().getTime() < start + delay);
    }

    console.log('1');
    sleep(1000);
    console.log('2');

    store.dispatch('getTags', query.key).then((res) => {
      console.log(res);
      setTimeout(function () {
        console.log(res);
        self.data = res;
        // store.commit('setCheckObj', {key: 'tags', value: true});
      }, 1000);
    });
  },
  beforeMount () {
  }
};
</script>

<style>
</style>