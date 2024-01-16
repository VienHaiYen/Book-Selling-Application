import state from "../stores/app-state.js";

const OrderCustomerInfo = {
  props: {
    title: String,
  },
  data() {
    return {
      state,
      user: Object,
    };
  },
  components: {},
  methods: {
    navigate(screen) {
      state.view = screen;
    },
  },
  created() {},
  mounted() {
    var userStr = localStorage.getItem("user");
    this.user = JSON.parse(userStr);
  },
  computed: {
    // Calculate the total dynamically based on the items in the cart
    calculatedTotal() {
      const selectedIds = this.state.inCartSelected.map(Number);

      // Filter the items in inCart that match the selected IDs
      if (state.inCart) {
        const selectedItems = this.state.inCart.filter((item) =>
          selectedIds.includes(item.id)
        );
        // Calculate the total based on selected items
        return selectedItems.reduce(
          (total, item) => total + item.quantity * item.unit_price,
          0
        );
      }
      return 0;
    },
  },

  template: `
<div class="shopping-order">
	 <fieldset class="border p-2 order-fieldset">
   <legend  class="w-auto order-legend">Customer Information</legend>
	<div class="card-body">
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Customer Name</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">{{this.user.full_name}}</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Email</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">{{this.user.email}}</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Phone</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">{{this.user.phone}}</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Address</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">{{this.user.address}}</p>
		</div>
        </div>
	</div>
    
  
</fieldset>
</div>
  `,
};
export { OrderCustomerInfo };
