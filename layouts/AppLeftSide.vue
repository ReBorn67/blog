<template>
    <aside id="left-side" class="col-lg-3 d-none d-lg-block" :style="{ marginTop: marginTop+'px' }">
        <nav class="navbar-light border-right border-dark">
          <p class="uppercase font-bold pb-6">
            버전 <span class="text-nuxt-lightgreen">0.10.7</span>
          </p> 

          <h3 class="uppercase text-gray-500 pb-2">필수</h3> 

          <ul class="pb-8">
            <li class="py-2"><a href="/examples" class="text-gray-700 hover:text-nuxt-lightgreen">Hello world</a></li>
            <li class="py-2"><a href="/examples/seo-html-head" class="text-gray-700 hover:text-nuxt-lightgreen">SEO HTML Head</a></li>
          </ul>

          <h3 class="uppercase text-gray-500 pb-2">사용자 정의</h3> 

          <ul class="pb-8">
            <li class="py-2"><a href="/examples/cached-components" class="text-gray-700 hover:text-nuxt-lightgreen">캐시된 컴포넌트</a></li>
            <li class="py-2"><a href="/examples/custom-loading" class="text-gray-700 hover:text-nuxt-lightgreen">사용자 지정 로딩 컴포넌트</a></li>
            <li class="py-2"><a href="/examples/custom-routes" class="text-gray-700 hover:text-nuxt-lightgreen nuxt-link-exact-active nuxt-link-active text-nuxt-lightgreen">사용자 지정 경로</a></li>
            <li class="py-2"><a href="/examples/global-css" class="text-gray-700 hover:text-nuxt-lightgreen">전역 CSS</a></li>
            <li class="py-2"><a href="/examples/layouts" class="text-gray-700 hover:text-nuxt-lightgreen">레이아웃</a></li>
            <li class="py-2"><a href="/examples/middleware" class="text-gray-700 hover:text-nuxt-lightgreen">미들웨어</a></li>
            <li class="py-2"><a href="/examples/nested-routes" class="text-gray-700 hover:text-nuxt-lightgreen">중첩 경로</a></li>
            <li class="py-2"><a href="/examples/plugins" class="text-gray-700 hover:text-nuxt-lightgreen">플러그인</a></li>
            <li class="py-2"><a href="/examples/routes-transitions" class="text-gray-700 hover:text-nuxt-lightgreen">경로 전환</a></li>
          </ul>

          <h3 class="uppercase text-gray-500 pb-2">고급</h3> 

          <ul class="pb-8"><li class="py-2"><a href="/examples/async-data" class="text-gray-700 hover:text-nuxt-lightgreen">비동기 데이터</a></li>
            <li class="py-2"><a href="/examples/auth-routes" class="text-gray-700 hover:text-nuxt-lightgreen">인증 경로</a></li>
            <li class="py-2"><a href="/examples/vuex-store" class="text-gray-700 hover:text-nuxt-lightgreen">Vuex Store</a></li>
            <li class="py-2"><a href="/examples/i18n" class="text-gray-700 hover:text-nuxt-lightgreen">국제화 (i18n)</a></li>
            <li class="py-2"><a href="/examples/testing" class="text-gray-700 hover:text-nuxt-lightgreen">테스팅</a></li>
          </ul>
        </nav>
    </aside>
</template>

<script>
import BaseNav from "~/baseComponents/BaseNav";
import BaseDropdown from "~/baseComponents/BaseDropdown";
import CloseButton from "~/baseComponents/CloseButton";

export default {
    components: {
        BaseNav,
        CloseButton,
        BaseDropdown
    },
    data () {
        return {
            HOME_PATH: process.env.HOME_PATH,
            marginTop: window.scrollY
        };
    },
    methods: {
        handleLeftSide (event) {
            this.marginTop = $('#content').outerHeight() - 700 < window.scrollY ? $('#content').outerHeight() - 700 : window.scrollY;
        }
    },
    mounted () {
        console.log(this.$router.options.routes);
    },
    created () {
        window.addEventListener('scroll', this.handleLeftSide);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleLeftSide);
    }
};
</script>

<style>
#left-side {
}

#left-side nav {
    max-height: 700px;
    overflow-y: auto;
}
</style>
