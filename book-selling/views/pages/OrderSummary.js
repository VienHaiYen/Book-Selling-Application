import {
  OrderedItemList,
  OrderCustomerInfo,
  OrderPaymentMethod,
  BackButton,
} from "../components/index.js";
import state from "../stores/app-state.js";
const OrderSummary = {
  components: {
    OrderedItemList,
    OrderCustomerInfo,
    OrderPaymentMethod,
    BackButton,
  },
  data: function () {
    return {
      items: [],
      state,
    };
  },
  methods: {
    makeOrder() {
      $.ajax({
        url: "/orders",
        type: "POST",
        data: {
          item_list: state.inCartSelected,
          payment_method: state.paymentMethod,
        },
        success: function (data) {
          alert("Order successful");
          state.orderId = data.data.new_order_id;
          state.view = "OrderDetail";
        },
        error: function (error) {
          console.error(error);
        },
      });
    },
  },
  mounted() {},
  computed: {
    // Calculate the total dynamically based on the items in the cart
    calculatedTotal() {
      const selectedIds = this.state.inCartSelected.map(Number);

      // Filter the items in inCart that match the selected IDs
      if (state.inCart) {
        const selectedItems = this.state.inCart.filter((item) =>
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
    calculatedSelectedItems() {
      const selectedIds = this.state.inCartSelected.map(Number);
      if (state.inCart) {
        return state.inCart.filter((item) => selectedIds.includes(item.id));
      }
      return [];
    },
  },
  template: `
  <div class="flex-container">
  <div class="order-container">
  <BackButton />
  <div class="shopping-cart-title">
		ORDER SUMMARY
	</div>
   <link rel="stylesheet" href="./css/cart.css" />
    <OrderedItemList :displayList="calculatedSelectedItems"  title="My cart" />
    <OrderCustomerInfo/>
    <OrderPaymentMethod/>
    <div class="total-checkout">
 
    <div></div>
    <div></div>
 
    <div class='text-bold'>Total order: <i class="fa-solid fa-dollar-sign"></i>{{calculatedTotal}}</div>

   
  <button class="btn btn-success text-bold" @click="makeOrder()" >Purchase</button>
</div>
    </div>
  
    </div>

  `,
};

export { OrderSummary };
