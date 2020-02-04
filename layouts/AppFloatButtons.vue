<template>
    <div>
        <button type="button" class="btn btn-theme4-d btn-float bottom-1 rounded-circle" @click="scrollToTop">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
    </div>
</template>

<script>
export default {
    name: 'app-float-buttons',
    props: {
    },
    data () {
        return {
        };
    },
    computed: {
    },
    methods: {
        scrollToTop() {
            $('html, body').animate({scrollTop: '0'}, 500);
        },
    },
    beforeMount () {
    },
    mounted () {
    }
}
</script>

<style scoped>
.btn-float {
    position: fixed;
    right: 10px;
    max-width: 45px;
    max-height: 45px;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

.btn-float.bottom-1 {
    bottom: 10px;
}

.btn-float.bottom-2 {
    bottom: 55px;
}

.btn-float.bottom-3 {
    bottom: 100px;
}
</style>