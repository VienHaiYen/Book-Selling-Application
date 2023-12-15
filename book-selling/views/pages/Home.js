import { Banner, TextInput, BookItemList } from "../components/index.js";

import state from "../stores/app-state.js";

const Home = {
  data() {
    return {};
  },
  components: {
    Banner,
    TextInput,
    BookItemList,
  },
  methods: {},
  mounted() {},
  template: `
      <Banner />
      <BookItemList :isInCart=false title="Top books"/>
    `,
};

export { Home };
