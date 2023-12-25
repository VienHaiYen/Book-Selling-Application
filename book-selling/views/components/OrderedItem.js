import state from "../stores/app-state.js";
const OrderedItem = {
  props: {
    item: Object,
  },
  data() {
    return {
      data: Object,
      state,
    };
  },
  methods: {},
  mounted() {},
  template: `
  <div class="order-item">
 
    <div>
      <img class="order-image" :src="item.thumbnail"/>
    </div>
 
    <div class="order-description">
      <span>{{item.title}}</span>
      <span><i class="fa-solid fa-dollar-sign"></i>{{item.unit_price}}</span>
    </div>
 
    <div class="order-quantity">
       <img class="cart-button-image" src="images/remove-item.svg" />
      <div>{{item.quantity}}</div>
     
    </div>
 
    <div class="item-total-price"><i class="fa-solid fa-dollar-sign"></i>{{item.quantity*item.unit_price}}</div>
   
  </div>
  `,
};
export { OrderedItem };
