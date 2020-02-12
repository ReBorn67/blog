<template>
  <div class="">
    <div class="section-shaped my-0">
      <div class="shape shape-style-1 shape-primary">
        <span v-for="n in 10" :key="n" :class="'span-'+randomNumber(15, true)+'0'"></span>
      </div>

      <div class="align-items-center">
        <div class="col px-0">
          <div class="row justify-content-center align-items-center">
            <div class="col text-center pt-lg">
              <h1 class="text-white">{{ 'title' }}</h1>
              <p class="lead text-white mt-4 mb-5">[{{ 'sub' }}]</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">sub</th>
          <th scope="col">Title</th>
          <th scope="col">date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState(['menus', 'sideMenus', 'checkObj']),
  watch: {
    $route (to, from) {
    }
  },
  data () {
    return {
      route: this.$route
    };
  },
  methods: {
    randomNumber (size, toZero) {
      let number = Math.floor(Math.random() * size);
      if (!toZero) number++;
      return number;
    }
  },
  beforeCreate () {
  },
  beforeMount () {
    // console.log(this.sideMenus)
  }
};
</script>

<style>
</style>