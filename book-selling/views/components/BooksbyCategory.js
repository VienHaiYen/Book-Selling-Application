import state from "../stores/app-state.js";
import { BookItemList } from "./BookItemList.js";

const BookByCategory = {
  props: {
    title: String,
    isAdmin: Boolean,
    isInCart: Boolean,
  },
  data() {
    return {
      state,
    };
  },
  components: {
    BookItemList,
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
          else alert("Fail to add item to cart");
        },
        error: function (error) {
          console.error(error);
          alert("Fail to add item to cart");
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
  created() {},
  mounted() {},
  template: `
      <div class="d-flex justify-content-between mx-3 mt-3">
        <h2>{{title}}</h2>
        <button href="#" class="btn btn-outline-primary">See all</button>
      </div>
      <BookItemList :isInCart="isInCart" title="Top books"/>
  `,
};
export { BookByCategory };
