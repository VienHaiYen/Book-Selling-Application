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
  },
  mounted() {},
  template: `
    <div class="col-6 col-md-3 col-lg-2">
      <div class="card m-2">
        <img :src="book.thumbnail" style="max-height:400px" class="card-img-top" @click='navBookDetail(book.id)'>
        <div class="card-body">
          <h5 class="card-title">{{book.title}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">100.000d</h6>
          <p class="card-text bookcard-decription">{{book.description}}</p>
          <slot/>
        </div>
      </div>
    </div>
  `,
};
export { BookItem };
