import state from "../stores/app-state.js";
import { CartItem } from "./CartItem.js";

const CartItemList = {
  props: {
    title: String,
    total: Number,
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
        console.log(state.inCart);
        state.inCart = data.data || [];
      },
      error: function (error) {
        console.error(error);
      },
    });
  },
  computed: {
    // Calculate the total dynamically based on the items in the cart
    calculatedTotal() {
      const selectedIds = state.inCartSelected.map(Number);

      // Filter the items in inCart that match the selected IDs
      if (state.inCart) {
        const selectedItems = state.inCart.filter((item) =>
          selectedIds.includes(item.id)
        );
        // Calculate the total based on selected items
        return selectedItems.reduce(
          (total, item) => total + item.quantity * item.unit_price,
          0
        );
      }

      return 0;
    },
    selectedItems() {
      if (state.inCartSelected.length > 0) return true;
      else return false;
    },
  },

  template: `
<div class="shopping-cart">

  <div class="shopping-cart-title">
    MY CART
  </div>
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

  <div>
    <div class="cart-total-selected-sticky">
      <div class="item-total-price text-bold">Total: <span><i class="fa-solid fa-dollar-sign"></i>{{calculatedTotal}}</span></div>
      <button :disabled="!selectedItems" class="btn btn-success text-bold" @click="navigate('OrderSummary')">Check out</button>
    </div>
  </div>

</div>

  `,
};
export { CartItemList };
