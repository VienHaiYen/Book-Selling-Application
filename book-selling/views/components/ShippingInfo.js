import state from "../stores/app-state.js";

const ShippingInfo = {
  props: {
    title: String,
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
  },
  created() {},
  mounted() {},
  computed: {
    // Calculate the total dynamically based on the items in the cart
    calculatedTotal() {
      const selectedIds = this.state.inCartSelected.map(Number);

      // Filter the items in inCart that match the selected IDs
      const selectedItems = this.state.inCart.filter((item) =>
        selectedIds.includes(item.id)
      );

      // Calculate the total based on selected items
      return selectedItems.reduce(
        (total, item) => total + item.quantity * item.unit_price,
        0
      );
    },
  },

  template: `
<div class="shopping-order">

	<div class="shopping-cart-title">
		ORDER SUMMARY
	</div>
	<div class="card-body">
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Full Name</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">Johnatan Smith</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Email</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">example@example.com</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Phone</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">(097) 234-5678</p>
		</div>
	</div>
	<hr>
	<div class="row">
		<div class="col-sm-3">
			<p class="mb-0">Address</p>
		</div>
		<div class="col-sm-9">
			<p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
		</div>
        </div>
	</div>
    
        <div class="row order-item">
 
    <div>
      
    </div>
 
    <div></div>
 
    <div>Total: </div>
 
    <div class="item-total-price">{{calculatedTotal}}</div>
   
  <button class="btn btn-success" >Purchase</button>
</div>

</div>
  `,
};
export { ShippingInfo };
