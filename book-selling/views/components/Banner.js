import state from "../stores/app-state.js";

import { BookItem } from './BookItem.js';

const Banner = {
  data() {
    return {
      state,
      activeBanner: 0,
    };
  },
  components: {
    BookItem,
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
        .get("/book", {
          params: {
            id,
          }
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        })
    },
  },
  template: `
    <div id="bannerview" class="d-flex mt-2 mb-2 w-100 justify-content-around">
      <button class="banner-control d-flex align-items-center" type="button" @click="this.viewPrev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <div id="carousel-banner" class="carousel" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button"  v-for="(book,index) in state.bannerList.slice(0,5)" data-bs-target="#carousel-indicators" :data-bs-slide-to="index" :class="activeBanner==index?'active':''" class="indicators" aria-label="Slide 1" @click="this.buttonClick(index)"></button>
        </div>
        <div class="carousel-inner" v-for="(book,index) in state.bannerList.slice(0,5)" data-bs-interval="10000">
          <div class="carousel-item" :class="index==this.activeBanner?'active':''" @click="selectBook(book.id)" style="cursor:pointer;">
            <BookItem :book="book" :key="index" />
          </div>
        </div>
      </div>
      <button class="banner-control  d-flex align-items-center" type="button" @click="this.viewNext">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `,
};

export { Banner };
