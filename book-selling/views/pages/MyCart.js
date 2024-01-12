import { CartItemList } from "../components/index.js";
import state from "../stores/app-state.js";
const MyCart = {
  components: { CartItemList },
  data: function () {
    return {
      items: [],
      total: Number,
      state,
    };
  },
  methods: {
    navigate(screen) {
      state.view = screen;
    },
  },
  mounted() {},
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
   <div>
   <link rel="stylesheet" href="./css/cart.css" />
   <div class="shopping-cart">

    <div class="shopping-cart-title">
      MY CART
    </div>
    <CartItemList  title="My cart" />
     <div class="cart-total-selected-sticky">
      <div class="item-total-price text-bold">Total order: <span><i class="fa-solid fa-dollar-sign"></i>{{calculatedTotal}}</span></div>
      <button :disabled="!selectedItems" class="btn btn-success text-bold" @click="navigate('OrderSummary')">Check out</button>
    </div>
    </div>
     </div>
  `,
};

export { MyCart };
