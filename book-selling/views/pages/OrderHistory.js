import { OrderHistoryItemList } from "../components/index.js";
import state from "../stores/app-state.js";
const OrderHistory = {
  components: { OrderHistoryItemList },
  data: function () {
    return {
      total: Number,
      state,
      orders: Array,
    };
  },
  methods: {
    navigate: (screen) => {
      state.view = screen;
    },
    fetchData: async () => {
      await $.ajax({
        url: `/orders/user/${state.user.id}`,
        type: "GET",
        success: function (res) {
          state.tempVal = res.data || [];
        },
        error: function (error) {
          console.error(error);
        },
      });
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
    viewDetail(order_id) {
      state.orderId = order_id;
      state.view = "OrderDetail";
    },
  },
  async created() {},
  async mounted() {
    await this.fetchData();
    this.orders = state.tempVal;
    console.log(this.orders);
  },
  computed: {},

  template: `
   <div>
   <link rel="stylesheet" href="./css/cart.css" />
   <div class="shopping-history-container">

    <div class="shopping-cart-title">
      ORDER HSITORY
    </div>
    <div v-if="this.orders.length > 0">
   <div class="shopping-history-order" v-for="(order, index) in this.orders" :key="order.id">

 
   <div class="order-history-brief-info-bar">
  <div >Order ID: <span class="order-id">#{{order.id}}</span></div>
 

   <div style="justify-self: end;">Date: {{formatDate(order.updated_at)}}</div>
    <div></div>
    <div  style="justify-self: end;">Status: <span class="order-status-bg-green">{{order.status}}</span></div>
   </div>
    <OrderHistoryItemList :items="order.order_items"  title="My cart" />
    <div class="grid-col-2">
      <button class="btn btn-sm btn-outline-success col-5" @click="viewDetail(order.id)" >View detail</button>
     <div class='text-bold history-total-order' >Total order: <i class="fa-solid fa-dollar-sign"></i>{{order.total}}</div>
       
    </div>
    </div>
    </div>
     <div v-else>
    <div class="p-5">No item</div>
    </div>
    </div>
   
    </div>
  `,
};

export { OrderHistory };
