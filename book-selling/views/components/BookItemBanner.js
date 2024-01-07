import state from "../stores/app-state.js";
const BookItemBanner = {
  props: {
    book: Object,
  },
  data() {
    return {
      data: Object,
      state,
      isHovering: false,
    };
  },
  methods: {
    mountOnBook: () => {
      isHovering = true;
    },
    mountOutBook: () => {
      isHovering = false;
    },

    navBookDetail(book_id) {
      state.bookId = book_id;
      state.view = "BookDetail";
    },
  },
  mounted() {},
  template: `
    <div class="m-2 col" style="minWidth:14rem ; maxWidth:18rem" @click='navBookDetail(book.id)'  @mouseenter="()=> isHovering = true" @mouseleave="()=>isHovering = false">
      <div class="card position-relative">
        <img :src="book.thumbnail" class="card-img-top" >
        <div v-if="isHovering" class="card-body position-absolute top-0 h-100 text-white pt-3" style="background-color:#5D5D5D9C">
          <h5 class="card-title fw-bold book-title" style="height:40px">{{book.title}}</h5>
          <h6 class="card-subtitle mb-2">{{book.unit_price}}$</h6>
          <p class="card-subtitle mb-2 fst-italic mb-0" style="font-size: 14px">Stock: {{book.available_quantity}} left</p>
          <p class="card-text bookcard-decription">{{book.description}}</p>
          <slot/>
        </div>
      </div>
    </div>
  `,
};
export { BookItemBanner };
