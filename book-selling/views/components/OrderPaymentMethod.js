import state from "../stores/app-state.js";

const OrderPaymentMethod = {
  props: {
    title: String,
  },
  data() {
    return {
      state,
    };
  },
  components: {},
  methods: {},
  created() {},
  mounted() {},

  template: `
<div class="shopping-order">
	 <fieldset class="border p-2 order-fieldset">
   <legend  class="w-auto order-legend">Payment Method</legend>
	<div class="card-body">
      <div  class='payment-method-group'>
        <input id="Cash" type="radio" name="paymentMethod" value="cash" checked="checked">
        <i class="fa-solid fa-money-bill-wave payment-method-name"></i>
        <label class="payment-method-name" for="Cash">Cash</label>    
	    </div>
	<div class='payment-method-group'>
		<input id="MePay" type="radio" name="paymentMethod" value="mepay" >
        <i class="fa-solid fa-wallet payment-method-name"></i>
        <label for="MePay"> <div class="order-description">
      <span class="payment-method-name">MePay Balance </span>
      <span><i class="fa-solid fa-dollar-sign"></i>1000</span>
    </div></label>
    </div>
  
	</div>
    
  
</fieldset>
</div>
  `,
};
export { OrderPaymentMethod };
