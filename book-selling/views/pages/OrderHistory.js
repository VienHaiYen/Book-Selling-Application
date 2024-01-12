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
    fetchData: async (page = 1, pageSize = 5) => {
      await $.ajax({
        url: `/orders/user/${state.user.id}?page=${page}&pageSize=${pageSize}`,
        type: "GET",
        success: function (res) {
          state.tempArray = res.data || [];
          state.currentPage = res.meta.page;
          state.totalPage = res.meta.totalPages;
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
    goToNextPage() {
      if (state.currentPage < state.totalPage) {
        state.currentPage++;
        this.fetchData(state.currentPage);
      }
    },
    goToPreviousPage() {
      if (state.currentPage > 1) {
        state.currentPage--;
        this.fetchData(state.currentPage);
      }
    },
  },
  async created() {},
  async mounted() {
    await this.fetchData();
  },
  computed: {},

  template: `
   <div>
   <link rel="stylesheet" href="./css/cart.css" />
   <div class="shopping-history-container">

    <div class="shopping-cart-title">
      ORDER HISTORY
    </div>
    <div class="d-flex justify-content-end align-items-center gap-3">
    <span><span style="color:#ee4d2d;">{{state.currentPage}}</span>/{{state.totalPage}}</span>
  <ul class="pagination m-0">
    <li class="page-item">
      <button @click="goToPreviousPage()" class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </button>
    </li>
    <li class="page-item">
      <button @click="goToNextPage()" class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </button>
    </li>
  </ul>
</div>
    <div v-if="this.orders.length > 0">
   <div class="shopping-history-order" v-for="(order, index) in state.tempArray" :key="order.id">

 
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
