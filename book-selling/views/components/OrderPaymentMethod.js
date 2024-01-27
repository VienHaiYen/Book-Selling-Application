import state from "../stores/app-state.js";
import { SmallSpinner } from "./index.js";
const OrderPaymentMethod = {
  props: {
    title: String,
    total: Number,
  },
  data() {
    return {
      state,
      accountBalance: 0,
    };
  },
  components: { SmallSpinner },
  methods: {
    async fetchClientBalance() {
      state.onLoading = true;
      await $.ajax({
        url: `/users/balance`,
        type: "get",
        success: (data) => {
          this.accountBalance = data.balance;
        },
        error: (error) => {
          console.error(error);
        },
      });
      state.onLoading = false;
    },
    async fetchAdminBalance() {
      state.onLoading = true;
      await $.ajax({
        url: `/balance`,
        type: "get",
        success: (data) => {
          console.log(data);
          // this.accountBalance = data.balance;
        },
        error: (error) => {
          console.error(error);
        },
      });
      state.onLoading = false;
    },
    updatePaymentMethod(method) {
      state.paymentMethod = method;
      console.log(state.paymentMethod);
    },
  },
  async created() {
    state.paymentMethod = "cash";
    if (state.user.role == "admin") {
      await this.fetchAdminBalance();
    } else {
      await this.fetchClientBalance();
    }
  },
  mounted() {},

  template: `
    <SmallSpinner v-if="state.onLoading" />
  <div v-else class="shopping-order">
	 <fieldset class="border p-2 order-fieldset">
   <legend  class="w-auto order-legend">Payment Method</legend>
<div class="card-body">
  <div class='payment-method-group'>
    <input id="Cash" type="radio" name="paymentMethod" value="cash" checked="checked" @change="updatePaymentMethod('cash')">
    <i class="fa-solid fa-money-bill-wave payment-method-name"></i>
    <label class="payment-method-name" for="Cash">Cash</label>    
  </div>
  <div class='payment-method-group'>
    <input id="MePay" type="radio" name="paymentMethod" value="mepay" @change="updatePaymentMethod('mepay')" :disabled="(accountBalance<this.total)">
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
