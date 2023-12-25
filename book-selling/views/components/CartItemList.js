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
    axios
      .get("/myCart")
      .then((res) => {
        state.inCart = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  computed: {
    // Calculate the total dynamically based on the items in the cart
    calculatedTotal() {
      const selectedIds = this.state.inCartSelected.map(Number);

      // Filter the items in inCart that match the selected IDs
      const selectedItems = this.state.inCart.filter((item) =>
        selectedIds.includes(item.id)
      );

      // Calculate the total based on selected items
      return selectedItems.reduce(
        (total, item) => total + item.quantity * item.unit_price,
        0
      );
    },
  },

  template: `
<div class="shopping-cart">

	<div class="shopping-cart-title">
		MY CART
	</div>
	<div class="shopping-cart-item">
		<div></div>

		<div> </div>

		<div>Item</div>

		<div>Quantity</div>

		<div>Total Price</div>
		<div></div>
	</div>
	<CartItem v-for="(item,index) in state.inCart" :item="item" :key="item.id">

	</CartItem>


	<div class="cart-total-selected-sticky">
		<div class="item-total-price text-bold">Total: <span><i class="fa-solid fa-dollar-sign"></i>{{calculatedTotal }}</span></div>
		<button class="btn btn-success text-bold"  @click="navigate('OrderSummary')">Check out</button>
	</div>
</div>
  `,
};
export { CartItemList };
