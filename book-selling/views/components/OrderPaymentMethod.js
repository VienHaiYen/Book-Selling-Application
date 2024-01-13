import state from "../stores/app-state.js";

const OrderPaymentMethod = {
  props: {
    title: String,
  },
  data() {
    return {
      state,
      accountBalance: 0,
    };
  },
  components: {},
  methods: {
    fetchData() {
      $.ajax({
        url: `/users/balance`,
        type: "get",
        success: (data) => {
          this.accountBalance = data.balance;
        },
        error: (error) => {
          console.error(error);
        },
      });
    },
    updatePaymentMethod(method) {
      state.paymentMethod = method;
      console.log(state.paymentMethod)
    },
  },
  created() {
    state.paymentMethod = "cash";
    this.fetchData();
  },
  mounted() {},

  template: `
<div class="shopping-order">
	 <fieldset class="border p-2 order-fieldset">
   <legend  class="w-auto order-legend">Payment Method</legend>
<div class="card-body">
  <div class='payment-method-group'>
    <input id="Cash" type="radio" name="paymentMethod" value="cash" checked="checked" @change="updatePaymentMethod('cash')">
    <i class="fa-solid fa-money-bill-wave payment-method-name"></i>
    <label class="payment-method-name" for="Cash">Cash</label>    
  </div>
  <div class='payment-method-group'>
    <input id="MePay" type="radio" name="paymentMethod" value="mepay" @change="updatePaymentMethod('mepay')">
    <i class="fa-solid fa-wallet payment-method-name"></i>
    <label for="MePay">
      <div class="order-description">
        <span class="payment-method-name">MePay Balance </span>
        <span><i class="fa-solid fa-dollar-sign"></i>{{ accountBalance }}</span>
      </div>
    </label>
  </div>
  
	</div>
    
  
</fieldset>
</div>
  `,
};
export { OrderPaymentMethod };
