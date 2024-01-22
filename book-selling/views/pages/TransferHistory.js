import {
  Spinner,
  BackButton,
  TransferHistoryItemList,
} from "../components/index.js";
import state from "../stores/app-state.js";
const TransferHistory = {
  components: { Spinner, BackButton, TransferHistoryItemList },
  data() {
    return {
      total: Number,
      state,
      orders: [],
      isAll: true,
      mepay: "",
      cash: "",
    };
  },
  methods: {
    navigate: (screen) => {
      state.view = screen;
    },
    async fetchAllTransactions(page = 1, pageSize = 5) {
      state.onLoading = true;

      await axios
        .get(`/users/payment/history?page=${page}&pageSize=${pageSize}`)
        .then((res) => {
          this.orders = res.data.data;
          state.currentPage = res.data.meta.page;
          state.totalPage = res.data.meta.totalPages;
        })
        .catch((err) => {
          console.error(err);
        });
      state.onLoading = false;
    },
    async fetchPay() {
      this.mepay = await axios
        .get(`/users/payment/total?method=mepay`)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
      this.cash = await axios
        .get(`/users/payment/total?method=cash`)
        .then((res) => {
          return res.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    viewDetail(order_id) {
      state.orderId = order_id;
      state.view = "OrderDetail";
    },
    goToNextPage() {
      if (state.currentPage < state.totalPage) {
        state.currentPage++;
        this.fetchAllTransactions(state.currentPage);
      }
    },
    goToPreviousPage() {
      if (state.currentPage > 1) {
        state.currentPage--;
        this.fetchAllTransactions(state.currentPage);
      }
    },
  },
  async mounted() {
    await this.fetchAllTransactions();
    await this.fetchPay();
  },
  computed: {},

  template: `
  <link rel="stylesheet" href="./css/cart.css" />
  <div>
  <BackButton />
  <div class="shopping-history-container">
    <div class="d-flex justify-content-between">
      <div class="shopping-cart-title">{{isAll?'TRANSFER HISTORY':'TOTAL PAY BY METHOD'}}</div>
      <select v-model="isAll" @change="changeMode" style="width:200px; height:40px" class="form-select" aria-label="Default select example">
        <option selected :value=true>All transaction</option>
        <option :value=false>Total by method</option>
      </select> 
    </div>
    <Spinner v-if="state.onLoading" />
    <div v-if="isAll">
      <div class="d-flex justify-content-end align-items-center gap-3">
        <span
          ><span style="color: #ee4d2d">{{state.currentPage}}</span
          >/{{state.totalPage}}</span
        >
        <ul class="pagination m-0">
          <li class="page-item">
            <button
              @click="goToPreviousPage()"
              class="page-link"
              href="#"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li class="page-item">
            <button
              @click="goToNextPage()"
              class="page-link"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </div>
      <TransferHistoryItemList v-if="orders" :orders="orders" />
    </div>
    <div class="mx-5" v-else>
      <div class="card w-100">
        <div class="card-body d-flex justify-content-between">
          <h5 class="card-title">Mepay</h5>
          <p class="card-text">$ {{mepay}}</p>
        </div>
      </div>
      <div class="card w-100">
        <div class="card-body d-flex justify-content-between">
          <h5 class="card-title">Cash</h5>
          <p class="card-text">$ {{cash}}</p>
        </div>
      </div>
    </div>
  </div>
  </div>

  `,
};

export { TransferHistory };
