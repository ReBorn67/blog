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
              <h1 class="text-white">CentOS 7 방화벽 설정</h1>
              <p class="lead text-white mt-4 mb-5">[firewalld]</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-4">
      <div id="section1" class="doc-section">
        <h2>1. firewalld</h2>

        <tabs fill type="theme4" class="flex-column flex-md-row">
          <card shadow slot-scope="{activeTabIndex}">
            <tab-pane title="방화벽">
              <h4>1) 서비스 실행 및 등록</h4>

              <br>

              <h6>- 설명</h6>
              <p class="description">
                CentOS 7의 방화벽인 firewalld를 실행하고 부팅시 자동 실행하도록 등록한다.
              </p>

              <pre class="command-line language-bash" data-user="root"><code class="language-bash" v-html="getPrismHTML(exCodes.section1.systemctl, 'bash')"></code></pre>

              <hr>

              <h4>2) 방화벽 허용 포트 추가</h4>

              <br>

              <h6>- 설명</h6>
              <p class="description">
                firewall-cmd 명령어를 이용하여 방화벽에 허용할 포트를 추가한다.
              </p>

              <pre class="command-line language-bash" data-user="root"><code class="language-bash" v-html="getPrismHTML(exCodes.section1.addPort, 'bash')"></code></pre>

              <hr>

              <h4>3) 방화벽 새로고침</h4>

              <br>

              <h6>- 설명</h6>
              <p class="description">
                firewall-cmd 명령어를 이용하여 방화벽을 새로고침 한다.
              </p>

              <pre class="command-line language-bash" data-user="root"><code class="language-bash" v-html="getPrismHTML(exCodes.section1.reload, 'bash')"></code></pre>
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
import loadLanguages from "prismjs/components/index.js";
import PrismBash from "prismjs/components/prism-bash.js";
loadLanguages(['bash.js']);

import 'prismjs/plugins/command-line/prism-command-line.js';
import 'prismjs/plugins/command-line/prism-command-line.css';

import 'prismjs/themes/prism-tomorrow.css';

import exCodes from "~/exCodes/centos7/etc/방화벽.js";

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