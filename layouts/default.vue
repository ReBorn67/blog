<template>
    <div id="app">
        <app-header name="header"></app-header>
        <main class="mt-4">
            <div class="container">
                <div class="row">
                    <app-left-side name="left-side"></app-left-side>

                    <fade-transition class="col col-lg-9 ml-auto" origin="center" mode="out-in" :duration="250">
                        <div id="content"><nuxt /></div>
                    </fade-transition>
                </div>
            </div>
        </main>
        <app-footer name="footer"></app-footer>
    </div>
</template>

<script>
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppLeftSide from "./AppLeftSide";
import { FadeTransition } from "vue2-transitions";

export default {
    components: {
        AppHeader,
        AppFooter,
        AppLeftSide,
        FadeTransition
    },
    data () {
        return {
        };
    }
};
</script>

<style>
</style>
