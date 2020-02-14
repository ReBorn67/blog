<template>
  <div id="pagination">
    {{listObject.totalPage}}
    {{listObject.currentPage}}
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <!-- left arrow -->
        <li class="page-item">
          <router-link
            v-if="listObject.totalPage > 5"
            :disabled="listObject.currentPage == 1"
            class="page-link"
            :to="listObject.currentPage > 1 ? { name: 'list', query: { parent: parent, sub: sub, page: 1 }} : '#'"
          >
            <span><i class="fa fa-angle-double-left" aria-hidden="true"></i></span>
          </router-link>
        </li>
        <li class="page-item">
          <router-link
            v-if="listObject.totalPage > 5"
            :disabled="listObject.currentPage == 1"
            class="page-link"
            :to="listObject.currentPage > 1 ? { name: 'list', query: { parent: parent, sub: sub, page: listObject.currentPage - 1 }} : '#'"
          >
            <span><i class="fa fa-angle-left" aria-hidden="true"></i></span>
          </router-link>
        </li>

        <!-- link -->

        <li v-for="index in (listObject.startIndex, listObject.endIndex)" class="page-item"><a class="page-link" href="#">{{ index }}</a></li>

        <!-- right arrow -->

        <li class="page-item">
          <router-link
            v-if="listObject.currentPage < listObject.totalPage"
            :disabled="listObject.currentPage == listObject.totalPage"
            class="page-link"
            :to="listObject.currentPage < listObject.totalPage ? { name: 'list', query: { parent: parent, sub: sub, page: listObject.currentPage + 1 }} : '#'"
          >
            <span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
          </router-link>
        </li>
        <li class="page-item">
          <router-link
            v-if="listObject.currentPage < listObject.totalPage"
            :disabled="listObject.currentPage == listObject.totalPage"
            class="page-link"
            :to="listObject.currentPage < listObject.totalPage ? { name: 'list', query: { parent: parent, sub: sub, page: listObject.totalPage }} : '#'"
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
    listObject: {
      type: Object,
      required: true
    }
  },
  data () {
  },
  methods: {
  },
  mounted() {
  },
}
</script>

