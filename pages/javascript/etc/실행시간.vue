<template>
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
              <h1 class="text-white">실행시간</h1>
              <p class="lead text-white mt-4 mb-5">&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-4">
      <div id="section1" class="doc-section">
        <h2>1. 실행시간</h2>

        <tabs fill type="theme4" class="flex-column flex-md-row">
          <card shadow slot-scope="{activeTabIndex}">
            <tab-pane title="replace">
              <h4>1) getTime</h4>

              <br>

              <h6>- 기본</h6>
              <p class="description">
                간단하게 Date 객체의 getTime() 메소드를 이용하여 두 시점의 millisecond 값을 구하고, <br>
                그 두 시점의 차를 구하면 된다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section1.getTime, 'js')"></code></pre>
            </tab-pane>
          </card>
        </tabs>
      </div>
    </div>
  </div>
</template>
<script>
import Tabs from "~/components/Tabs/Tabs.vue";
import TabPane from "~/components/Tabs/TabPane.vue";

import Prism from "prismjs";
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/themes/prism-tomorrow.css';

import exCodes from "~/exCodes/javascript/etc/실행시간.js";

export default {
  components: {
    Tabs,
    TabPane
  },
  data () {
    return {
      exCodes: exCodes
    };
  },
  methods: {
    getPrismHTML (code, type) {
      return Prism.highlight(code, Prism.languages[type], type);
    }
  },
  beforeMount () {
  }
};
</script>

<style>
</style>