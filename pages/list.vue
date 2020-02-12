<template>
  <div class="bg-theme1">
    <h1>list page</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['menus', 'sideMenus', 'checkObj']),
  watch: {
    $route (to, from) {
    }
  },
  data () {
    return {
      route: this.$route
    };
  },
  methods: {
  },
  beforeCreate () {
  },
  beforeMount () {
  }
};
</script>

<style>
</style>