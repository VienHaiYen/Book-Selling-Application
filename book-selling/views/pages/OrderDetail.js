import {
  OrderedItemList,
  OrderCustomerInfo,
  OrderPaymentMethod,
} from "../components/index.js";
import state from "../stores/app-state.js";
const OrderDetail = {
  components: { OrderedItemList, OrderCustomerInfo, OrderPaymentMethod },
  data: function () {
    return {
      items: [],
      state,
      orderDetail: Object,
    };
  },
  methods: {
    fetchData() {
      if (!state.orderId) {
        alert("Invalid action");
        return;
      }
      $.ajax({
        url: `/orders/detail/${state.orderId}`,
        type: "get",
        success: (data) => {
          this.orderDetail = data.data;
          const date = new Date(data.data.created_at);

          const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          };

          const formattedDate = date.toLocaleString("en-US", options);
          this.orderDetail.created_at = formattedDate;
        },
        error: (error) => {
          console.error(error);
        },
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  computed: {},
  template: `
 <div class="flex-container">
    <div class="order-container">
        <div class="shopping-cart-title">
            ORDER DETAIL
        </div>
        <div class="mt-2 d-flex justify-content-center">
            <div style="width:100%;">

                <div class="order-detail-brief-info-bar">
                    <div>Order ID: <span class="order-id">#{{this.orderDetail.id}}</span></div>


                    <div style="justify-self: end;">Date: {{this.orderDetail.created_at}}</div>
                    <div></div>
                    <div style="justify-self: end;">Status: <span
                            class="order-status-bg-green">{{this.orderDetail.status}}</span></div>

                </div>
                <div class="shopping-order">
	 <fieldset class="border p-2 order-fieldset">
   <legend  class="w-auto order-legend">Customer Information</legend>
	<div class="card-body">
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Customer Name</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">{{state.user.full_name}}</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Email</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">{{state.user.email}}</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Phone</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">{{state.user.phone}}</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Address</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">{{state.user.address}}</p>
		</div>
        </div>
	</div>
    
  
</fieldset>
</div>
            </div>

        </div>

        <link rel="stylesheet" href="./css/cart.css" />
        <OrderedItemList :displayList="this.orderDetail.order_items" />

        <div class="order-detail-checkout">
            <div class="mt-2 d-flex justify-content-between align-items-end" style="width:80%">

                <div>
                    <div class="fw-bold">Payment ID: <span class='fw-light'>#1212323 </span></div>
                    <div class="fw-bold">Payment method: <span class='fw-light'>MePay Balance</span></div>
                </div>
                <div class='text-bold'>Total order: <i class="fa-solid fa-dollar-sign"></i>{{this.orderDetail.total}}
                </div>
            </div>
        </div>

    </div>

</div>

  `,
};

export { OrderDetail };
