import state from "../stores/app-state.js";
const BookItem = {
  props: {
    book: Object,
  },
  data() {
    return {
      data: Object,
      state,
    };
  },
  methods: {
    navBookDetail(book_id) {
      state.bookId = book_id;
      state.view = "BookDetail";
    },
    async getInventory() {},
  },
  mounted() {
    this.getInventory();
  },
  template: `
    <div class="col-6 col-md-3 col-lg-2">
      <div class="card m-2">
        <img :src="book.thumbnail" style="aspect-ratio: 9 / 16;" class="card-img-top" @click='navBookDetail(book.id)'>
        <div class="card-body">
          <div style="height:70px">
            <h5 class="card-title bold book-title">{{book.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">100.000d</h6>
          </div>
          <p class="card-text bookcard-decription">{{book.description}}</p>
          <slot/>
        </div>
      </div>
    </div>
  `,
};
export { BookItem };
