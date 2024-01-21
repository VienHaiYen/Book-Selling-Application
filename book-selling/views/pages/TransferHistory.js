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
    };
  },
  methods: {
    navigate: (screen) => {
      state.view = screen;
    },
    async fetchData(page = 1, pageSize = 5) {
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
  <link rel="stylesheet" href="./css/cart.css" />
  <div>
  <BackButton />
  <div class="shopping-history-container">
    <div class="shopping-cart-title">TRANSFER HISTORY</div>
    <Spinner v-if="state.onLoading" />
    <div>
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
  </div>
  </div>

  `,
};

export { TransferHistory };
