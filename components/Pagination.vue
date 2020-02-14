<template>
  <div id="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <!-- left arrow -->
        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == 1" class="page-link">
            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link"
            :to="{ name: 'list', query: { parent: parent, sub: sub, page: 1 }}"
          >
            <span><i class="fa fa-angle-double-left" aria-hidden="true"></i></span>
          </router-link>
        </li>
        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == 1" class="page-link">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link"
            :to="{ name: 'list', query: { parent: parent, sub: sub, page: pagiObject.currentPage - 1 }}"
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
          <router-link
            class="page-link"
            :to="{ name: 'list', query: { parent: parent, sub: sub, page: pageNum }}"
          >
            <span>{{ pageNum }}</span>
          </router-link>
        </li>

        <!-- right arrow -->

        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == pagiObject.totalPage" class="page-link">
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link"
            :to="{ name: 'list', query: { parent: parent, sub: sub, page: pagiObject.currentPage + 1 }}"
          >
            <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
          </router-link>
        </li>
        <li v-if="pagiObject.viewSideBtn" class="page-item">
          <span v-if="pagiObject.currentPage == pagiObject.totalPage" class="page-link">
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
          </span>

          <router-link
            v-else
            class="page-link"
            :to="{ name: 'list', query: { parent: parent, sub: sub, page: pagiObject.totalPage }}"
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
    parent: {
      type: String,
      required: true
    },
    sub: {
      type: String,
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

