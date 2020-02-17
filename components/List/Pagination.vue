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
            :to="{ name: path, query: getQuery(1)}"
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
            :to="{ name: path, query: getQuery(pagiObject.currentPage - 1)}"
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
          <span v-if="pageNum == pagiObject.currentPage" class="page-link shadow bg-theme2 text-white">{{ pageNum }}</span>

          <router-link
            v-else
            class="page-link shadow"
            :to="{ name: path, query: getQuery(pageNum)}"
          >
            <span>{{ pageNum }}</span>
          </router-link>
        </li>

        <!-- right arrow -->

        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == pagiObject.totalPage" class="page-link shadow">
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link shadow"
            :to="{ name: path, query: getQuery(pagiObject.currentPage + 1)}"
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
            :to="{ name: path, query: getQuery(pagiObject.totalPage)}"
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
    getQuery (pageNum) {
      let query = {};

      if (this.listParent) query['parent'] = this.listParent;
      if (this.listSub)    query['sub']    = this.listSub;
      if (this.searchType) query['type']   = this.searchType;
      if (this.searchKey)  query['key']    = this.searchKey;

      query['page'] = pageNum;

      return query;
    }
  },
  beforeMount () {
  },
  mounted () {
  },
}
</script>

