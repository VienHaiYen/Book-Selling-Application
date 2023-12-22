import { OrderedItemList } from "../components/index.js";
import { ShippingInfo } from "../components/index.js";

const CheckOut = {
  components: { OrderedItemList, ShippingInfo },
  data: function () {
    return {
      items: [],
    };
  },
  method: {},
  mounted() {},

  template: `
  <div class="flex-container">
  <div class="order-container">
   <link rel="stylesheet" href="./css/cart.css" />
    <OrderedItemList  title="My cart" />
    <ShippingInfo/>
    </div>
    </div>
  `,
};

export { CheckOut };
