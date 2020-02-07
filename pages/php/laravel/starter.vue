<template v-bind:test="123">
  <div>
    <div class="section-shaped my-0">
      <div class="shape shape-style-1 shape-primary">
        <span class="span-150"></span>
        <span class="span-50"></span>
        <span class="span-50"></span>
        <span class="span-75"></span>
        <span class="span-100"></span>
        <span class="span-75"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
        <span class="span-50"></span>
        <span class="span-100"></span>
      </div>

      <div class="align-items-center">
        <div class="col px-0">
          <div class="row justify-content-center align-items-center">
            <div class="col text-center pt-lg">
              <h1 class="text-white">테스트</h1>
              <p class="lead text-white mt-4 mb-5"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tabs from "~/components/Tabs/Tabs.vue";
import TabPane from "~/components/Tabs/TabPane.vue";

export default {
  name: 'php-laravel-test',
  title: '테스트',
  tag: 'laravel,문자열,test,indexOf,잘되네,정규식',
  timestamp: '2020-02-07',
  components: {
    Tabs,
    TabPane
  },
  data () {
    return {
      HOME_PATH: process.env.HOME_PATH
    };
  },
  methods: {
  },
  beforeMount () {
  }
};
</script>

<style>
.doc-section {
}

.doc-section .nav-link.active {
  /*background-color: #475A80;*/
}

</style>
