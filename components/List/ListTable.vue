<template>
  <div id="listTable" class="shadow">
    <table class="table table-sm table-hover my-4">
      <thead class="bg-theme3 text-white">
        <tr>
          <th scope="col" class="text-center mw-7">#</th>
          <th scope="col">Title</th>
          <th scope="col" class="text-center d-none d-md-table-cell mw-11">date</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in list" :key="index">
          <th scope="row" class="align-middle text-center">{{ item.listIndex }}</th>
          <td class="">
            <h6 class="font-weight-bold">
              <div class="d-flex justify-content-between flex-wrap">
                <router-link
                  class="text-dark text-truncate"
                  :to="item.path"
                  :style="{ 'max-width': columnWidth + 'px' }"
                >
                  <span :data-title="item.title">{{ item.title }}</span>
                </router-link>
                <small class="d-inline-block d-md-none">[{{ item.timestamp }}]</small>
              </div>
            </h6>

            <div class="d-flex small text-theme2">
              <button @click="showTags(item)" class="btn btn-link btn-link-theme2 p-0 mr-1 m-0 border-0">
                <i class="fa fa-tags" aria-hidden="true"></i>
              </button>

              <div id="tagsWrap" class="text-truncate" :style="{ 'max-width': (columnWidth - 25) + 'px' }">
                <router-link
                  v-for="(tag, tagIndex) in item.tags.split(',')" 
                  :key="tag" 
                  :to="'/search?type=tags&key='+tag" 
                  class="text-theme2 font-italic"
                >
                  <span v-if="tagIndex == item.tags.split(',').length - 1">{{ tag }}</span>
                  <span v-else>{{ tag }}, </span>
                </router-link>
              </div>
            </div>
          </td>
          <td class="align-middle text-center d-none d-md-table-cell">
            <small>{{ item.timestamp }}</small>
          </td>
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
    return {
      columnWidth: 600
    };
  },
  methods: {
    showTags (row) {
      console.log(row)
      console.log(row.tags)
      let tags = row.tags;
    },
    getColumnWidth () {
      let result = 0;

      if (screen.width < 768) {
        return $('#listTable').outerWidth() - 70;
      } else {
        return $('#listTable').outerWidth() - 140;
      }

      return result;

    },
    handleResize (event) {
      this.columnWidth = this.getColumnWidth();
    }
  },
  beforeCreate () {
  },
  created () {
    window.addEventListener('resize', this.handleResize);
  },
  beforeMount () {
  },
  mounted () {
    this.columnWidth = this.getColumnWidth();
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<style>
.mw-7 {
  width: 7%;
  min-width: 7%;
}
.mw-11 {
  width: 11%;
  min-width: 11%;
}
.mw-90 {
  min-width: 90%;
}

.row {
  margin: 0;
}
.row .col {
  padding: 0.25rem;
}
</style>
