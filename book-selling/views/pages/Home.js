import {
  Banner,
  TextInput,
  BookItemList,
  BookByCategory,
} from "../components/index.js";

import state from "../stores/app-state.js";

const Home = {
  emits: ["changeView"],
  data() {
    return {};
  },
  components: {
    Banner,
    TextInput,
    BookItemList,
    BookByCategory,
  },
  methods: {},
  mounted() {},
  // <BookItemList :isInCart=false title="Top books"/>
  template: `
      <Banner />
      <BookByCategory :isInCart=false title="Popular"/>

    `,
};

export { Home };
