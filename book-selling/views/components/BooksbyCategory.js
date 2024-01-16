import state from "../stores/app-state.js";
import { BookItemList } from "./BookItemList.js";

const BookByCategory = {
  props: {
    // title: String,
    categoryId: String,
  },
  data() {
    return {
      bookList: [],
      state,
      category: {},
    };
  },
  components: {
    BookItemList,
  },
  computed: {
    books() {
      return state.bannerList?.data.slice(0, 6);
    },
  },
  methods: {},
  created() {},
  mounted() {},
  methods: {
    addToCart(item_id) {
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
          alert("Failed to add item to cart");
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
          } else alert("Failed to buy item");
        },
        error: function (error) {
          console.error(error);
        },
      });
    },
    async getBookListByCate() {
      state.onLoading = true;
      await axios
        .get(`categories/${this.categoryId}`)
        .then((res) => {
          this.bookList = res.data.data.books
            .filter((item) => item.status == true)
            .slice(0, 6);
          this.category = res.data.data.category;
        })
        .catch((err) => {
          console.error(err);
        });
      state.onLoading = false;
    },
    seeAllBookOfCategory() {
      state.categorySelected = this.categoryId;
      state.view = "BookPageByCate";
    },
  },
  created() {},
  mounted() {
    this.getBookListByCate();
  },
  template: `
      <div class="d-flex justify-content-between mx-3 mt-3">
        <h2>{{category.name}}</h2>
        <button href="#" class="btn btn-outline-primary" @click="this.seeAllBookOfCategory">See all</button>
      </div>
      <BookItemList :books="bookList"/>
  `,
};
export { BookByCategory };
