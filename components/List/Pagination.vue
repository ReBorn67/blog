<template>
  <div id="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <!-- left arrow -->
        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == 1" class="page-link shadow">
            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link shadow"
            :to="{ name: path, query: Object.assign(query, { page: 1 })}"
          >
            <span><i class="fa fa-angle-double-left" aria-hidden="true"></i></span>
          </router-link>
        </li>
        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == 1" class="page-link shadow">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link shadow"
            :to="{ name: path, query: Object.assign(query, { page: pagiObject.currentPage - 1 })}"
          >
            <span><i class="fa fa-angle-left" aria-hidden="true"></i></span>
          </router-link>
        </li>

        <!-- link -->

        <li
          v-if="pagiObject.startIndex <= pageNum && pageNum <= pagiObject.totalPage"
          v-for="pageNum in pagiObject.endIndex" 
          class="page-item"
        >
          <span v-if="pageNum == pagiObject.currentPage" class="page-link shadow">{{ pageNum }}</span>

          <router-link
            v-else
            class="page-link shadow"
            :to="{ name: path, query: Object.assign(query, { page: pageNum })}"
          >
            <span>{{ pageNum }}</span>
          </router-link>
          <!-- <router-link
            v-else
            class="page-link shadow"
            :to="{ name: path, query: { parent: parent, sub: sub, page: pageNum }}"
          >
            <span>{{ pageNum }}</span>
          </router-link> -->
        </li>

        <!-- right arrow -->

        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == pagiObject.totalPage" class="page-link shadow">
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link shadow"
            :to="{ name: path, query: Object.assign(query, { page: pagiObject.currentPage + 1 })}"
          >
            <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
          </router-link>
        </li>
        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == pagiObject.totalPage" class="page-link shadow">
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link shadow"
            :to="{ name: path, query: Object.assign(query, { page: pagiObject.totalPage })}"
          >
            <span><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  components: {
  },
  props: {
    pagiObject: {
      type: Object,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    listParent: {
      type: String
    },
    listSub: {
      type: String
    },
    searchType: {
      type: String
    },
    searchKey: {
      type: String
    }
  },
  data () {
    return {
      query: {}
    };
  },
  methods: {
    setQuery () {
      let query = {};

      if (this.listParent) query['parent'] = this.listParent;
      if (this.listSub)    query['sub']    = this.listSub;
      if (this.searchType) query['type']   = this.searchType;
      if (this.searchKey)  query['key']    = this.searchKey;

      return query;
    }
  },
  beforeMount () {
    this.query = this.setQuery();
  },
  mounted () {
  },
}
</script>

