<template>
  <div id="listTable" class="shadow">
    <table class="table table-sm table-hover my-4">
      <thead class="bg-theme3 text-white">
        <tr>
          <th scope="col" class="text-center">#</th>
          <th scope="col">Title</th>
          <th scope="col" class="text-center">date</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <th scope="row" class="align-middle text-center">{{ item.index + 1 }}</th>
          <td>
            <h6 class="font-weight-bold">
              <router-link
                class="text-dark"
                :to="item.path" 
              >
                <span>{{ item.title }}</span>
              </router-link>
            </h6>

            <small class="blockquote-footer text-theme2">
              <i class="fa fa-tags" aria-hidden="true"></i>

              <router-link
                v-for="(tag, tagIndex) in item.tags.split(',')" 
                :key="tag" 
                :to="'/search?type=tags&key='+tag" 
                class="text-theme2 font-italic"
              >
                <span v-if="tagIndex == item.tags.split(',').length - 1">{{ tag }}</span>
                <span v-else>{{ tag }}, </span>
              </router-link>
            </small>
          </td>
          <td class="align-middle text-center">{{ item.timestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'list-table',
  components: {
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {};
  },
  methods: {
  },
  mounted() {
  },
}
</script>

