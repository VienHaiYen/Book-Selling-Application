import state from "../stores/app-state.js";

const BookDetail = {
  props: {},
  components: {},
  data() {
    return {
      book: {},
      author: {},
      category: {},
      state,
    };
  },
  methods: {
    async getBookDetail() {
      await axios
        .get(`/books/detail/${this.id}`)
        .then((res) => {
          console.log(res);
          this.book = res.data.data.book;
          this.author = res.data.data.author;
          this.category = res.data.data.category;
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
          console.log(454, data);
          const new_item_id = data.data.new_item_id;
          if (new_item_id !== -1) alert("Added to cart");
          else alert("Fail to add item to cart");
        },
        error: function (error) {
          console.error(error);
          alert("Fail to add this item to cart");
        },
      });
    },
    buyNow(item_id) {
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
          } else alert("Fail to buy item");
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
          <div v-if="book.title!=undefined" class="p-4 py-xl-5">
            <div class="bg-white border rounded border-0 border-dark overflow-hidden">
                <div class="row g-0">
                    <div class="col-md-5 col-lg-4 px-2 px-sm-2 order-first" style="min-width: 250px;">
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
                            <h2><span><strong></strong></span>{{"Bổ sung gấp"}}$</h2>
                            <div v-if="!(state.user == undefined ? false : state.user.role == 'admin')" class="my-3">
                              <a class="btn btn-primary btn-md me-2" @click="buyNow(book.id)" role="button" href="#">Buy Now</a>
                              <a class="btn btn-outline-secondary btn-md" @click="addToCart(book.id)" role="button" href="#">Add to Cart</a>
                            </div>
                            <div v-else class="my-3">
                              <a class="btn btn-primary btn-md me-2" role="button" href="#">Edit</a>
                              <a class="btn btn-outline-secondary btn-md" role="button" href="#">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
  `,
};

export { BookDetail };
