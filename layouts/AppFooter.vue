<template>
  <footer class="footer has-cards pb-0">
    <div class="container container-lg d-none d-lg-block">
      <div class="row">
        <div class="col-md-4 mb-5 mb-md-0">
          <card class="footer-block border-0" shadow body-classes="py-5">
            <div class="d-flex mb-4">
              <icon name="fa fa-list" type="theme1" rounded></icon>
              <h6 class="text-theme1 text-uppercase mb-0 ml-4 align-self-center">Recent Posts</h6>
            </div>

            <div v-if="!checkPosts" class="d-flex justify-content-center py-5">
              <div class="spinner-grow text-theme1 align-self-center" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>

            <div v-else class="">
              <router-link v-for="post in recentPosts" :to="post.path" class="d-flex w-100 footer-links">
                <h6 class="text-theme1">
                  <small><i class="fa fa-circle" aria-hidden="false"></i></small>
                  <span class="text-truncate">{{ post.title }}</span>
                </h6>

                <small class="text-light ml-auto">{{ post.timestamp }}</small>
              </router-link>

              <!-- <a v-for="post in recentPosts" :href="post.path" class="d-flex w-100 footer-links">
                <h6 class="text-theme1">
                  <small><i class="fa fa-circle" aria-hidden="false"></i></small>
                  <span class="text-truncate">{{ post.title }}</span>
                </h6>

                <small class="text-light ml-auto">{{ post.timestamp }}</small>
              </a> -->
            </div>
          </card>
        </div>

        <div class="col-md-4 mb-5 mb-lg-0">
          <card class="footer-block border-0" shadow body-classes="py-5">
            <div class="d-flex mb-4">
              <icon name="fa fa-comments" type="theme3" rounded></icon>
              <h6 class="text-theme3 text-uppercase mb-0 ml-4 align-self-center">Recent Comments</h6>
            </div>

            <div>
              <a v-for="n in 6" href="#" class="d-flex w-100 footer-links">
                <h6 class="text-theme3">
                  <small><i class="fa fa-circle" aria-hidden="false"></i></small>
                  <span class="text-truncate">recent comment {{ n }}</span>
                </h6>

                <small class="text-light ml-auto">2020-01-0{{ n }}</small>
              </a>
            </div>
          </card>
        </div>

        <div class="col-md-4 mb-5 mb-lg-0">
          <card class="footer-block border-0" shadow body-classes="py-5">
            <div class="d-flex mb-4">
              <icon name="fa fa-tags" type="theme5" rounded></icon>
              <h6 class="text-theme5 text-uppercase mb-0 ml-4 align-self-center">Tags</h6>
            </div>

            <div v-if="!checkTags" class="d-flex justify-content-center py-5">
              <div class="spinner-grow text-primary align-self-center" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>

            <div v-else class="d-flex flex-wrap">
              <a v-for="tag in tagKeys" :href="'/search?type=tags&key='+tag" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">{{ tag }}</a>
            </div>
          </card>
        </div>
      </div>
    </div>

    <div class="container bg-max-lg-light">
      <div class="row align-items-center justify-content-md-between py-2 py-lg-4">
        <div class="col text-center">
          <div class="copyright">
            <span>ReBorn67's IT Blog</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer',
  props: {
    checkPosts: {
      type: Boolean
    },
    checkCommnets: {
      type: Boolean
    },
    checkTags: {
      type: Boolean
    }
  },
  watch: {
    checkPosts (checkPosts) {
      if (checkPosts) {
        let posts      = this.$store.getters.posts;
        let timestamps = Object.keys(posts);

        let count = 0;

        timestamps.forEach((timestamp, index) => {
          if (count >= this.recentSize) return true;

          posts[timestamp].forEach((post) => {
            if (count >= this.recentSize) return true;

            this.recentPosts.push(post);
            count++;
          });
        });

        this.posts = posts;
      }
    },
    checkCommnets (checkCommnets) {
      if (checkCommnets) {
      }
    },
    checkTags (checkTags) {
      if (checkTags) {
        this.tagKeys = Object.keys(this.$store.getters.tags);
      }
    }
  },
  data() {
    return {
      recentSize: 6,
      posts: this.$store.getters.posts,
      recentPosts: [],
      tagKeys: Object.keys(this.$store.getters.tags),
      HOME_PATH: process.env.HOME_PATH,
      // year: new Date().getFullYear()
    }
  },
  methods: {
  },
  mounted () {
  }
};
</script>

<style>
.footer-block {
  min-height: 320px;
  max-height: 320px;
}

.footer-links {}
.footer-links:hover {
  text-decoration: underline;
}

@media (max-width: 991px) {
  .footer {
    padding-top: 1.5rem !important;
    margin-top: 0 !important;
  }

  .footer .container {
    max-width: 100%;
  }

  .footer .container.bg-max-lg-light {
    background-color: #3f79a8;
    color: white;
  }
}
</style>
