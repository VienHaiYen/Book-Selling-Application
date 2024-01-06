import state from "../stores/app-state.js";
import { CartItem } from "./CartItem.js";

const CartItemList = {
  props: {
    title: String,
  },
  data() {
    return {
      state,
    };
  },
  components: {
    CartItem,
  },
  methods: {
    navigate(screen) {
      state.view = screen;
    },
  },
  created() {},
  mounted() {
    $.ajax({
      url: "/myCart",
      type: "GET",
      success: function (data) {
        state.inCart = data.data || [];
      },
      error: function (error) {
        console.error(error);
      },
    });
  },

  template: `
<div v-if="state.inCart.length > 0" >
  <div class="shopping-cart-item">
    <div></div>
    <div></div>
    <div>Item</div>
    <div>Quantity</div>
    <div>Total Price</div>
    <div></div>
  </div>
  <CartItem v-for="(item, index) in state.inCart" :item="item" :key="item.id" />
</div>
<div v-else>
    <div class="p-5">No item in cart</div>
</div>

 

  `,
};
export { CartItemList };
