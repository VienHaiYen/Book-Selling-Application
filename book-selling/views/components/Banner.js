import state from "../stores/app-state.js";

import { BookItemBanner } from "./BookItemBanner.js";

const Banner = {
  data() {
    return {
      state,
      activeBanner: 0,
    };
  },
  components: {
    BookItemBanner,
  },
  methods: {
    viewNext() {
      this.activeBanner += 1;
      if (this.activeBanner > 4) {
        this.activeBanner = 0;
      }
    },
    viewPrev() {
      this.activeBanner -= 1;
      if (this.activeBanner < 0) {
        this.activeBanner = 4;
      }
    },
    buttonClick(page) {
      this.activeBanner = page;
    },
    async selectBook(id) {
      await axios
        .get(`/books/detail/${id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  template: `
    <div id="bannerview" class="d-flex mt-2 mb-2 w-100 justify-content-around">
      <button class="banner-control px-5 d-flex align-items-center border-0 " type="button" @click="this.viewPrev">
        <span class="text-dark fs-3" aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <div id="carousel-banner" class="carousel" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" v-for="(book,index) in state.bannerList?.data.slice(0,10).filter((book) => book.status == true)" data-bs-target="#carousel-indicators" :data-bs-slide-to="index" :class="activeBanner == index ? 'active' : ''" class="indicators" aria-label="Slide 1" @click="this.buttonClick(index)"></button>
        </div>
        <div class="carousel-inner" v-for="(book,index) in state.bannerList?.data.slice(0,10).filter((book) => book.status == true)" data-bs-interval="10000">
          <div class="carousel-item" :class="index==this.activeBanner?'active':''" @click="selectBook(book.id)" style="cursor:pointer;">
            <BookItemBanner :book="book" :key="index" />
          </div>
        </div>
      </div>
      <button class="banner-control px-5 d-flex align-items-center border-0 " type="button" @click="this.viewNext">
        <span class="text-dark fs-3" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `,
};

export { Banner };
