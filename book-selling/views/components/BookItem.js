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
    <div class="m-2 col" style="minWidth:14rem ; maxWidth:18rem">
      <div class="card">
        <img :src="book.thumbnail" class="card-img-top" @click='navBookDetail(book.id)'>
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
