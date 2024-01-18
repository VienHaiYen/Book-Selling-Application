import state from "../stores/app-state.js";
const BookItem = {
  props: {
    book: Object,
  },
  data() {
    return {
      data: Object,
      state,
      unit_price: "",
      quantity: "",
    };
  },
  methods: {
    navBookDetail(book_id) {
      state.bookId = book_id;
      state.view = "BookDetail";
    },
    async getBookInventory() {
      await axios
        .get("/inventory/availableQuantity/" + this.book.id)
        .then((res) => {
          this.unit_price = res.data.data.unit_price;
          this.quantity = res.data.data.available_quantity;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getBookInventory();
  },
  template: `
    <div  class="col-6 col-md-3 col-lg-2">
      <div class="card m-2 p-1 book-card">
        <img :src="book.thumbnail" style="aspect-ratio: 9 / 16;" class="card-img-top" @click='navBookDetail(book.id)'>
        <div class="card-body">
          <h6 class="card-title fw-bold book-title" style="height:40px">{{book.title}}</h6>
          <h6 class="card-subtitle mb-2 text-muted">{{unit_price}}$</h6>
          <p class="card-subtitle mb-2 text-muted fst-italic mb-0" style="font-size: 14px">Stock: {{quantity}} left</p>
          <p class="card-text bookcard-decription">{{book.description}}</p>
          <slot/>
        </div>
      </div>
    </div>
  `,
};
export { BookItem };
