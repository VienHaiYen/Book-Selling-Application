import state from "../stores/app-state.js";
import { BookItem } from "./BookItem.js";

const BookItemList = {
  props: {
    title: String,
    isInCart: Boolean,
    isAdmin: Boolean,
  },
  data() {
    return {
      state,
    };
  },
  components: {
    BookItem,
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
          console.log(data);
        },
        error: function (error) {
          console.error(error);
        },
      });
    },
    navBookDetail(book_id) {
      state.bookId = book_id;
      state.view = "BookDetail";
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
            console.log(new_item_id);
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
  created() {},
  mounted() {},
  template: `
      <div class="mx-2">
        <h2>{{this.title}}</h2>
        <div class="m-0 d-flex flex-wrap justify-content-start ">
          <BookItem v-for="(book,index) in state.bannerList?.data.slice(0,10)" :book="book" :key="index">
           <div v-if="!isInCart">
              <button class="btn btn-outline-primary mr-2 mb-2"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
              <button class="btn btn-outline-primary"> Mua ngay</button>
           </div>
           <div v-if="isAdmin" class=" mb-2 d-flex justify-content-between">
              <button class="btn btn-outline-primary mr-2"><i class="fas fa-edit"></i> Chỉnh sửa</button>
              <button class="btn btn-danger"> Xóa </button>
           </div>
          </BookItem>
        </div>
      </div>
  `,
};
export { BookItemList };
