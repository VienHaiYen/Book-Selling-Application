import state from "../stores/app-state.js";
import { Spinner, BookByCategory, BackButton } from "../components/index.js";
const BookDetail = {
  props: {},
  components: { Spinner, BookByCategory, BackButton },
  data() {
    return {
      book: {},
      author: {},
      category: {},
      state,
      id: "",
      onLoading: true,
      unit_price: "",
      quantity: "",
    };
  },
  methods: {
    async getBookDetail() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      this.onLoading = true;
      await $.ajax({
        url: `/books/detail/${this.id}`,
        type: "GET",
        success: (res) => {
          this.book = res.data.book;
          this.author = res.data.author;
          this.category = res.data.category;
        },
        error: function (error) {
          console.error(error);
        },
      });
      this.onLoading = false;
    },
    addToCart(item_id) {
      if (state.user == undefined) {
        alert("Please sign in to add item to cart");
        state.view = "SignIn";
        return;
      }
      $.ajax({
        url: "/myCart/item",
        type: "POST",
        data: {
          item_id: item_id,
          quantity: 1,
        },
        success: (data) => {
          const new_item_id = data.data.new_item_id;
          if (new_item_id !== -1) alert("Added to cart");
          else alert("Failed to add item to cart");
        },
        error: function (error) {
          console.error(error);
          alert("Failed to add this item to cart");
        },
      });
    },
    buyNow(item_id) {
      if (state.user == undefined) {
        alert("Please sign in to add item to cart");
        state.view = "SignIn";
        return;
      }
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
          } else alert("Failed to buy item");
        },
        error: function (error) {
          console.error(error);
        },
      });
    },
    editBook() {
      state.activeId = this.id;
      state.view = "EditBook";
    },
    async getBookInventory() {
      await axios
        .get("/inventory/availableQuantity/" + this.id)
        .then((res) => {
          this.unit_price = res.data.data.unit_price;
          this.quantity = res.data.data.available_quantity;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleStoreViewToLocalStorage() {},
    async loadBookDetail() {
      this.id = state.bookId
        ? state.bookId
        : localStorage.getItem("bookIdDetail");
      this.onLoading = true;
      await this.getBookDetail();
      await this.getBookInventory();
      if (state.bookId) {
        localStorage.setItem("bookIdDetail", state.bookId);
      }
    },
  },
  async mounted() {
    this.$watch(() => state.bookId, this.loadBookDetail);
    this.loadBookDetail();
  },
  watch: {
    "state.bookId": "loadBookDetail",
  },

  template: `
      <Spinner v-if="this.onLoading" />
      <div v-else v-if="book.title!=undefined" class="p-2">
        <BackButton />
        <div class="bg-white border rounded border-0 border-dark overflow-hidden">
            <div class="row g-0">
                <div class="col-md-5 col-lg-4 px-2 py-3 order-first" style="min-width: 250px;">
                  <img class="w-100 fit-cover" :src="book.thumbnail" />
                </div>
                <div class="col-md-7 col-lg-8">
                    <div class=" p-3">
                        <h2 class="fw-bold text mb-3">{{book.title}} ({{book.published_year}})</h2>
                        <h5>{{author.name}}</h5>
                        <p class="card-text"><span><strong>Category: </strong></span>{{category.name}}</p>
                        <p class="card-text"><span><strong>Language: </strong></span>{{book.language}}</p>
                        <p class="card-text"><span><strong>Publisher: </strong></span><span>{{book.publisher}}</span></p>
                        <p class="card-text"><span><strong>Page number: </strong></span>{{book.page_count}}</p>
                        <p class="card-text"><span><strong>Short desscription: </strong></span>{{book.description}}</p>
                        <h2><span><strong></strong></span>$ {{unit_price}}</h2>
                        <h6><span><strong></strong></span>Stock {{quantity}} left</h6>
                        <div v-if="!(state.user == undefined ? false : state.user.role == 'admin')" class="my-3">
                          <a class="btn btn-primary btn-md me-2" @click="buyNow(book.id)" role="button" href="#">Buy Now</a>
                          <a class="btn btn-outline-secondary btn-md" @click="addToCart(book.id)" role="button" href="#">Add to Cart</a>
                        </div>
                        <div v-else class="my-3">
                          <a class="btn btn-primary btn-md me-2" role="button" @click="this.editBook">Edit</a>
                          <a class="btn btn-outline-secondary btn-md" role="button" href="#">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BookByCategory :categoryId="category.id"/>
      </div>
  `,
};

export { BookDetail };
