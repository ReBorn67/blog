<template>
    <div>
        <hero></hero>

        <base-button size="lg" type="primary" @click="doAlert">Primary</base-button>
        <base-button size="lg" type="primary" @click="doAlert">Primary</base-button>

        <basic-elements></basic-elements>
        <inputs></inputs>
        <custom-controls></custom-controls>
        <navigation></navigation>
        <javascript-components></javascript-components>
        <icons></icons>
        <examples></examples>
        <download-section></download-section>
        <carousel></carousel>
    </div>
</template>

<script>
import Hero from "~/components/Hero";
import BasicElements from "~/components/BasicElements";
import Inputs from "~/components/Inputs";
import CustomControls from "~/components/CustomControls";
import Navigation from "~/components/Navigation";
import JavascriptComponents from "~/components/JavascriptComponents";
import Carousel from "~/components/Carousel";
import Icons from "~/components/Icons";
import Examples from "~/components/Examples";
import DownloadSection from "~/components/DownloadSection";

const HOME_PATH = process.env.HOME_PATH;
const HOME_URL = process.env.HOME_URL;

export default {
    name: 'index',
    components: {
        Hero,
        BasicElements,
        Inputs,
        CustomControls,
        Navigation,
        JavascriptComponents,
        Carousel,
        Icons,
        Examples,
        DownloadSection
    },
    methods: {
        doAlert () {
            alert(process.env.HOME_URL);
            // alert(process.env.HOME_PATH);
            // alert(process.env.NODE_ENV);
        }
    },
    mounted () {
        console.log(HOME_PATH);
        console.log(HOME_URL);
        console.log(process);
        console.log(process.env);
    }
};
</script>
