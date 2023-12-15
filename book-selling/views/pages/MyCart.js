import { BookItemList } from "../components/index.js";

const MyCart = {
  components: { BookItemList },
  data: function () {
    return {
      books: [],
    };
  },
  method: {},
  mounted() {},
  template: `
    <BookItemList :isInCart=true title="My cart" />
  `,
};

export { MyCart };
