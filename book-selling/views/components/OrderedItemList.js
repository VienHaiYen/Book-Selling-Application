import state from "../stores/app-state.js";
import { OrderedItem } from "./OrderedItem.js";

const OrderedItemList = {
  props: {
    title: String,
  },
  data() {
    return {
      state,
      selectedItems: [],
    };
  },
  components: {
    OrderedItem,
  },
  methods: {},
  created() {},
  mounted() {
    const selectedIds = this.state.inCartSelected.map(Number);

    // Filter the items in inCart that match the selected IDs
    this.selectedItems = this.state.inCart.filter((item) =>
      selectedIds.includes(item.id)
    );
  },

  template: `
      <div class="shopping-order">
  
        <div class="shopping-cart-title">
           CHECK OUT
        </div>
 
<div class="order-item">
 
    <div>
      
    </div>
 
    <div>Item</div>
 
    <div>Quantity</div>
 
    <div>Total</div>
   
  </div>

        <OrderedItem v-for="(item,index) in this.selectedItems" :item="item" :key="item.id">
          
        </OrderedItem>
</div>
  `,
};
export { OrderedItemList };
