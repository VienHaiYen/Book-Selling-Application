import { CartItemList } from "../components/index.js";

const MyCart = {
  components: { CartItemList },
  data: function () {
    return {
      items: [],
    };
  },
  method: {},
  mounted() {},

  template: `
  <div>
   <link rel="stylesheet" href="./css/cart.css" />
    <CartItemList  title="My cart" />
    </div>
  `,
};

export { MyCart };
