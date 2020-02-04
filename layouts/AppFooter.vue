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

            <div class="">
              <a v-for="n in 6" href="#" class="d-flex w-100 footer-links">
                <h6 class="text-theme1">
                  <small><i class="fa fa-circle" aria-hidden="false"></i></small>
                  <span class="text-truncate">recent post {{ n }}</span>
                </h6>

                <small class="text-light ml-auto">2020-01-0{{ n }}</small>
              </a>
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

            <div class="d-flex flex-wrap">
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">marketing</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">product</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">launch</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">richesse</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">yearlong</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">ferruginous</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">benweed</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">indusioid</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">recursion</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">subcontrarily</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">uncolouredly</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">tuza</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">mozambique</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">equiformity</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">proctoplasty</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">ophthalmomalacia</a>
              <a href="#" class="ml-0 mr-1 mb-1 badge badge-pill badge-theme5">subalternately</a>
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
  data() {
    return {
      HOME_PATH: process.env.HOME_PATH,
      // year: new Date().getFullYear()
    }
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
