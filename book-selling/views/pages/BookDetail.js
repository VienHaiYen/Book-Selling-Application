import state from "../stores/app-state.js";

const BookDetail = {
  props: {},
  components: {},
  data() {
    return {
      book: {},
      state,
    };
  },
  methods: {
    async getBookDetail() {
      await axios
        .get("/books/" + this.id)
        .then((res) => {
          this.book = res.data;
          console.log(this.book);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addToCart(item_id) {
      $.ajax({
        url: "/myCart/item",
        type: "POST",
        data: {
          item_id: item_id,
          quantity: 1,
        },
        success: (data) => {
          console.log(data);
        },
        error: function (error) {
          console.error(error);
        },
      });
    },
    shopNow(item_id) {
      $.ajax({
        url: "/myCart/item",
        type: "POST",
        data: {
          item_id: item_id,
          quantity: 1,
        },
        success: (data) => {
          const new_item_id = data.data.new_item_id;
          if (new_item_id !== -1) {
            state.inCartSelected = [new_item_id];
            state.view = "OrderSummary";
          }
        },
        error: function (error) {
          console.error(error);
        },
      });
    },
  },
  created() {
    this.id = state.bookId;
  },
  mounted() {
    this.getBookDetail();
  },
  template: `
    <section >
      <div class="d-flex justify-content-center">
        <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
            <div class="card border-0 shadow">
                <img v-if="book" :src="book.thumbnail" alt="...">
            </div>
        </div>
        <div class=" col-md-5 col-lg-8">
            <div class="ps-lg-1-6 ps-xl-5">
                <div class="mb-2 wow fadeIn">
                    <div class="text-start wow fadeIn">
                        <h2 v-if="book"  class="h1 mb-0 text-primary">{{book.title}} <span>({{book.published_year}})</span></h2>
                        <h4 v-if="book"  class="my-2 mb-0 ">{{book.publisher}}</h4>
                    </div>
                    <p v-if="book" >{{book.description}}</p>
                </div>
                <div class="text-start wow fadeIn">
                    <h2 class="mb-2">100.000d</h2>
                </div>
                <div class="d-flex">
                  <button class="btn btn-outline-primary" @click="addToCart(book.id)"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
                  <button class="btn btn-outline-primary mx-2" @click="shopNow(book.id)"> Mua ngay</button>
                </div>
              </div>
          </div>
      </div>
    </section>
  `,
};

export { BookDetail };
