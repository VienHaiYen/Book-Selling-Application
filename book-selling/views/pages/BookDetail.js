import state from "../stores/app-state.js";

const BookDetail = {
  components: {},
  data() {
    return {
      tmp: {},
      state,
    };
  },
  methods: {},
  mounted() {},
  template: `
    <section >
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
            <div class="card border-0 shadow">
                <img v-if="state.bannerList[0]" :src="state.bannerList[0].thumbnail" alt="...">
            </div>
        </div>
        <div class="col-lg-8">
            <div class="ps-lg-1-6 ps-xl-5">
                <div class="mb-2 wow fadeIn">
                    <div class="text-start wow fadeIn">
                        <h2 v-if="state.bannerList[0]"  class="h1 mb-0 text-primary">{{state.bannerList[0].title}} <span>({{state.bannerList[0].published_year}})</span></h2>
                        <h4 v-if="state.bannerList[0]"  class="my-2 mb-0 ">{{state.bannerList[0].publisher}}</h4>
                    </div>
                    <p v-if="state.bannerList[0]" >{{state.bannerList[0].description}}</p>
                </div>
                <div class="text-start wow fadeIn">
                    <h2 class="mb-2">100.000d</h2>
                </div>
                <div class="d-flex">
                  <button class="btn btn-outline-primary"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
                  <button class="btn btn-outline-primary mx-2"> Mua ngay</button>
                </div>
              </div>
          </div>
      </div>
    </section>
  `,
};

export { BookDetail };
