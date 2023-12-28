import {
  OrderedItemList,
  OrderCustomerInfo,
  OrderPaymentMethod,
} from "../components/index.js";
import state from "../stores/app-state.js";
const OrderSummary = {
  components: { OrderedItemList, OrderCustomerInfo, OrderPaymentMethod },
  data: function () {
    return {
      items: [],
      state,
    };
  },
  method: {},
  mounted() {},
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
  <div class="flex-container">
  <div class="order-container">
  <div class="shopping-cart-title">
		ORDER SUMMARY
	</div>
   <link rel="stylesheet" href="./css/cart.css" />
    <OrderedItemList  title="My cart" />
    <OrderCustomerInfo/>
    <OrderPaymentMethod/>
    <div class="total-checkout">
 
    <div></div>
    <div></div>
 
    <div class='text-bold'>Total: <i class="fa-solid fa-dollar-sign"></i>{{calculatedTotal}}</div>

   
  <button class="btn btn-success text-bold" >Purchase</button>
</div>
    </div>
  
    </div>

  `,
};

export { OrderSummary };
