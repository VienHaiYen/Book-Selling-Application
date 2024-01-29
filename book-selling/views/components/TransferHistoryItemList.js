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
      let date = new Date(input_date);
      // date = this.addHours(date, 7);

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
    addHours(date, hours) {
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      return date;
    },
  },
  created() {},
  async mounted() {},

  template: `
      <div v-if="orders">
          <div
            class="shopping-history-order"
            v-for="(order, index) in orders"
            :key="order.order_id"
          >
            <div class="order-history-brief-info-bar">
              <div>
                <div>Transaction ID: <span class="order-id">#{{order.transaction_id}}</span></div>
                <div>Order ID: <span class="order-id">#{{order.id?order.id:order.order_id}}</span></div>
              </div>
              <div style="justify-self: end">
                Date: {{formatDate(order.created_at?order.created_at:order.paid_time)}}
              </div>
              <div></div>
              <div style="justify-self: end">
                Status: <span class="order-status-bg-green">{{order.status}}</span>
              </div>
            </div>
            <div class="text-bold history-total-order">
              Total paid: <i class="fa-solid fa-dollar-sign"></i>{{order.total}}
            </div>
            <h6 v-if="order.user_id">User id: {{order.user_id}}</h6>
          </div>
      </div>
      <div v-else>
        <div class="p-5">No item</div>
      </div>
  `,
};
export { TransferHistoryItemList };
