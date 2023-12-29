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
  computed: {
    calculatedSelectedItems() {
      const selectedIds = this.state.inCartSelected.map(Number);
      return this.state.inCart.filter((item) => selectedIds.includes(item.id));
    },
  },
  methods: {
    fetchCartItems() {
      fetch("/myCart")
        .then((response) => response.json())
        .then((data) => {
          this.state.inCart = data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.fetchCartItems();
  },
  mounted() {
    const selectedIds = this.state.inCartSelected.map(Number);

    // Filter the items in inCart that match the selected IDs
    this.selectedItems = this.state.inCart.filter((item) =>
      selectedIds.includes(item.id)
    );
  },
  template: `
<div class="shopping-order">

    <fieldset class="border p-2 order-fieldset">
   <legend  class="w-auto order-legend">Ordered Items</legend>

    <div class="order-item">

        <div>

        </div>

        <div>Item</div>

        <div>Quantity</div>

        <div>Total</div>

    </div>

    <OrderedItem v-for="(item,index) in calculatedSelectedItems" :item="item" :key="item.id">

    </OrderedItem>
    </fieldset>
</div>
  `,
};
export { OrderedItemList };
