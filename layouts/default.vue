<template>
    <div id="app">
        <app-header name="header" :menus="menus"></app-header>
        <main class="mt-4">
            <div class="container">
                <div class="row">
                    <app-left-side name="left-side" :menus="menus"></app-left-side>

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

import deepmerge from 'deepmerge';

export default {
    components: {
        AppHeader,
        AppFooter,
        AppLeftSide,
        FadeTransition
    },
    data () {
        return {
            menus: {}
        };
    },
    methods: {
        createMenu (pathTotalArr, obj, path) {
            if (!pathTotalArr.length) return true;

            let clone = deepmerge([], pathTotalArr);
            let self  = this;
            let sub   = [];

            clone.map((pathArr, index) => {
                let title = pathArr[0];

                if (pathArr.length == 1) {
                    obj['subTree'].push({
                        title: title,
                        path: [path, title].join('/')
                    });
                } else {
                    obj['subTree'].push({
                        title: title,
                        subTree: []
                    });
                }

                let parentIndex = -1;

                obj['subTree'] = obj['subTree'].map((item) => { return JSON.stringify(item); });
                obj['subTree'] = obj['subTree'].filter((item, index) => { return obj['subTree'].indexOf(item) === index; });
                obj['subTree'] = obj['subTree'].map((item) => { return JSON.parse(item); });

                obj['subTree'].forEach(function(item, index) {
                    if (item.title == title) {
                        parentIndex = index;
                        return true;
                    }
                });

                if(typeof sub[parentIndex] !== 'object') {
                    sub[parentIndex] = [];
                }

                pathArr.shift();

                if (!pathArr.length) {
                    return false;
                } else {
                    sub[parentIndex].push(pathArr);
                    return pathArr;
                }
            });

            sub.forEach(function(item, index) {
                if (item.length) {
                    let newPath = [path, obj['subTree'][index]['title']].join('/');
                    self.createMenu(item, obj['subTree'][index], newPath);
                }
            });

            return obj;
        },
        getMenus () {
            let routes = this.$router.options.routes;
            let pathTotalArr = {};

            pathTotalArr = routes.filter((item) => { return item.path != '/' });
            pathTotalArr = pathTotalArr.map((item) => { return item.path.substring(1).split('/'); });

            let menus = {
                title: 'root',
                subTree: []
            };

            let res = this.createMenu(pathTotalArr, menus, '');

            return res.subTree;
        }
    },
    beforeMount () {
        this.menus = this.getMenus();
    },
    mounted () {
    }
};
</script>

<style>
</style>
