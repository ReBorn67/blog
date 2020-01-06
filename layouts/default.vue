<template>
    <div id="app">
        <app-header name="header"></app-header>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <nuxt />
            </fade-transition>
        </main>
        <app-footer name="footer"></app-footer>
    </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    AppHeader,
    AppFooter,
    FadeTransition
  }
};
</script>

<style>
</style>
