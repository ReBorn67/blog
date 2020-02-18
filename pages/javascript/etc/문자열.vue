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
              <h1 class="text-white">문자열</h1>
              <p class="lead text-white mt-4 mb-5">[찾기, 자르기, 바꾸기]</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-4">
      <div id="section1" class="doc-section">
        <h2>1. 찾기</h2>

        <tabs fill type="theme4" class="flex-column flex-md-row" :tabNavItemCount="3">
          <card shadow slot-scope="{activeTabIndex}">
            <tab-pane title="indexOf">
              <h4>1) indexOf</h4>

              <p class="description">
                문자열에서 찾으려는 문자 혹은 문자열이 포함하면 시작 인덱스를 반환하고, 아니면 -1을 반환한다.<br>
                결과값이 0이라면 시작점에 포함됐다는 뜻이다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section1.indexOf, 'js')"></code></pre>
            </tab-pane>

            <tab-pane title="includes">
              <h4>2) includes</h4>

              <p class="description">
                ES6에서 포함된 메소드. 포함하면 true, 아니면 false를 반환한다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section1.includes, 'js')"></code></pre>
            </tab-pane>

            <tab-pane title="search">
              <h4>3) search</h4>

              <p class="description">
                indexOf와 같은 결과값을 갖는다. 단, 정규식을 이용할 수 있다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section1.search, 'js')"></code></pre>
            </tab-pane>

            <tab-pane title="lodash">
              <h4>4) lodash</h4>

              <p class="description">
                lodash 자바스크립트 라이브러리를 이용한 방법. 포함하면 true, 아니면 false를 반환한다.<br>
                참조 링크 : <a href="https://lodash.com/docs/4.17.15#includes">lodash documents</a>
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section1.lodash, 'js')"></code></pre>
            </tab-pane>

            <tab-pane title="test">
              <h4>5) test</h4>

              <p class="description">
                정규식 문법을 통해 문자열 검색을 한다. 포함하면 true, 아니면 false를 반환한다.<br>
                정규식이 아니면 에러가 난다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section1.test, 'js')"></code></pre>
            </tab-pane>

            <tab-pane title="match">
              <h4>6) match</h4>

              <p class="description">
                찾는 문자열을 배열로 반환한다. 찾지못하면 null을 반환한다.<br>
                정규식뿐만 아니라 일반 문자열로도 검색이 가능하다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section1.match, 'js')"></code></pre>
            </tab-pane>
          </card>
        </tabs>
      </div>

      <hr>

      <div id="section2" class="doc-section">
        <h2>2. 자르기</h2>

        <tabs fill type="theme4" class="flex-column flex-md-row">
          <card shadow slot-scope="{activeTabIndex}">
            <tab-pane title="substring">
              <h4>1) substring</h4>

              <br>

              <h6>- 앞에서 부터 자르기</h6>
              <p class="description">
                첫번째 매개변수 : 시작위치, 두번째 매개변수 : 종료위치<br>
                첫번째 매개변수는 필수값이며 두번째 매개변수는 입력하지 않으면 문자열 끝까지로 취급한다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section2.substring.forward, 'js')"></code></pre>

              <hr>

              <h6>- 뒤에서 부터 자르기</h6>
              <p class="description">
                문자열을 뒤에서 드래그한다는 생각으로 접근하면 이해하기 쉽다.<br>
                첫번째 매개변수는 드래그 시작점 두번째 매개변수는 드래그 종료지점
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section2.substring.reverse, 'js')"></code></pre>
            </tab-pane>

            <tab-pane title="substr">
              <h4>2) substr</h4>

              <br>

              <h6>- 앞에서 부터 자르기</h6>
              <p class="description">
                첫번째 매개변수 : 시작위치, 두번째 매개변수 : 길이<br>
                첫번째 매개변수는 필수값이며 두번째 매개변수는 입력하지 않으면 문자열 끝까지로 취급한다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section2.substr.reverse, 'js')"></code></pre>

              <hr>

              <h6>- 뒤에서 부터 자르기</h6>
              <p class="description">
                첫번째 매개변수를 [문자열 길이 - 값]을 함으로써 뒤에서부터 값만큼 이동한 위치를 지정하는 것이 포인트다.<br>
                이 다음은 "앞에서 부터 자르기"와 같은 규칙을 따른다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section2.substr.reverse, 'js')"></code></pre>
            </tab-pane>
          </card>
        </tabs>
      </div>

      <hr>

      <div id="section3" class="doc-section">
        <h2>3. 바꾸기</h2>

        <tabs fill type="theme4" class="flex-column flex-md-row">
          <card shadow slot-scope="{activeTabIndex}">
            <tab-pane title="replace">
              <h4>1) replace</h4>

              <br>

              <h6>- 기본</h6>
              <p class="description">
                @가 여러개가 있지만 가장 처음에 찾은 pattern만 change로 바꾼다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section3.replace.basic, 'js')"></code></pre>

              <hr>

              <h6>- 정규식</h6>
              <p class="description">
                1. 에서 정리한 문자열 찾기 이후 replace 메소드를 이용한 문자열 바꾸기<br>
                원래는 해당하는 가장 앞 항목만 바꿔야 하지만 정규식을 이용하면 replaceAll처럼 사용할 수 있다.
              </p>

              <pre class="line-numbers"><code class="language-js" v-html="getPrismHTML(exCodes.section3.replace.regex, 'js')"></code></pre>
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

import exCodes from "~/exCodes/javascript/etc/문자열.js";

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
