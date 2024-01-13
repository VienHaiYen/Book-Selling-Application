import state from "../stores/app-state.js";
import { BookItem } from "./BookItem.js";

const BookItemList = {
  props: {
    title: String,
    books: Array,
  },
  data() {
    return {
      state,
    };
  },
  components: {
    BookItem,
    state,
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
    editBook(book_id) {
      state.activeId = book_id;
      state.view = "EditBook";
    }
  },
  created() {},
  mounted() {},
  template: `

      <div class="mx-2">
        <div class="m-0 d-flex flex-wrap justify-content-start ">
          <BookItem v-for="(book,index) in books" :book="book" :key="index">
           <div v-if="!(state.user == undefined ? false : state.user.role == 'admin')">
              <button class="btn btn-primary m-1" @click="addToCart(book.id)"><i class="fas fa-shopping-cart"></i> Add to cart</button>
              <button class="btn btn-outline-primary m-1" @click="buyNow(book.id)">Buy now</button>
           </div>
           <div v-else class=" mb-2 ">
              <button class="btn btn-outline-primary mr-2 my-1 w-100" @click="editBook(book.id)"><i class="fas fa-edit"></i> Edit</button>
              <button @click="state.bookIdDeleteSelected=book.id" class="btn btn-danger my-1 w-100" data-bs-toggle="modal" data-bs-target="#deleteBook"> Delete </button>
           </div>
          </BookItem>
        </div>
      </div>
  `,
};
export { BookItemList };
