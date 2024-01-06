import state from "../stores/app-state.js";

const OrderHistoryItemList = {
  props: {
    title: String,
    items: Array,
  },
  data() {
    return {
      state,
    };
  },
  components: {},
  methods: {
    navigate(screen) {
      state.view = screen;
    },
  },
  created() {},
  mounted() {},

  template: `
<div v-if="items.length > 0" >
<div v-for="(item, index) in items" :item="item" :key="item.item_id" class="order-history-item">
 
    <div class="item-history-img">
      <img class="cart-image history-order-item-image" :src="item.thumbnail"/>
    </div>
 
    <div class="item-history-description">
      <span>{{item.title}}</span>
      <span><i class="fa-solid fa-dollar-sign"></i>{{item.unit_price}}</span>
    </div>
 
    <div class="order-quantity">
       <img class="cart-button-image" src="images/remove-item.svg" />
      <div>{{item.quantity}}</div>
     
    </div>
 
    <div class="item-total-price"><i class="fa-solid fa-dollar-sign"></i>{{item.quantity*item.unit_price}}</div>
  </div>

</div>
<div v-else>
    <div class="p-5">No item</div>
</div>

 

  `,
};
export { OrderHistoryItemList };
