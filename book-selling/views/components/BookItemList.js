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
  template: `
      <div class="mx-2">
        <h2>{{this.title}}</h2>
        <div class="m-0 d-flex flex-wrap justify-content-start ">
          <BookItem v-for="(book,index) in state.bannerList?.data.slice(0,10)" :book="book" :key="index">
           <div v-if="!isInCart">
              <button class="btn btn-outline-primary mr-2 mb-2"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
              <button class="btn btn-outline-primary"> Mua ngay</button>
           </div>
           <div v-if="isInCart" class=" mb-2 d-flex justify-content-between">
              <button class="btn btn-outline-primary mr-2"><i class="fas fa-edit"></i> Chỉnh sửa</button>
              <button class="btn btn-danger"> Xóa </button>
           </div>
          </BookItem>
        </div>
      </div>
  `,
};
export { BookItemList };
