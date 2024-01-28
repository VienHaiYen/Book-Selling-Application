import state from "../stores/app-state.js";

const TransferHistoryItemList = {
  props: {
    // title: String,
    orders: [],
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
    formatDate(input_date) {
      const date = new Date(input_date);

      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      };

      const formattedDate = date.toLocaleString("en-US", options);
      return formattedDate;
    },
  },
  created() {},
  async mounted() {
    await console.log(454454, this.orders);
  },

  template: `
      <div v-if="orders">
          <div
            class="shopping-history-order"
            v-for="(order, index) in orders"
            :key="order.order_id?order.order_id:order.id"
          >
            <div class="order-history-brief-info-bar">
              <div>
                <div>Transaction ID: <span class="order-id">#{{order.transaction_id?order.transaction_id:order.id}}</span></div>
                <div v-if="order.order_id">Order ID: <span class="order-id">#{{order.order_id}}</span></div>
              </div>
  
              <div style="justify-self: end">
                Date: {{formatDate(order.paid_time?order.paid_time:order.transaction_date)}}
              </div>
              <div></div>
              <div v-if="order.status" class="" style="justify-self: end">
                Status: <span class="order-status-bg-green">{{order.status}}</span>
              </div>
            </div>
            <div class="d-flex justify-content-end">
                <span style="justify-self: end">Method: {{order.payment_method? order.payment_method:order.transaction_type}}</span>
            </div>
            <div class="text-bold history-total-order">
              Total paid: <i class="fa-solid fa-dollar-sign"></i>{{order.total?order.total:order.amount}}
              </div>
              <i style="font-size:12px" v-if="order.user">{{order.user.email}}</i>
          </div>
      </div>
      <div v-else>
        <div class="p-5">No item</div>
      </div>
  `,
};
export { TransferHistoryItemList };
