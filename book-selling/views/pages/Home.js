import {
  Banner,
  TextInput,
  BookItemList,
  BookByCategory,
  AdminSearch,
} from "../components/index.js";

import state from "../stores/app-state.js";

const Home = {
  emits: ["changeView"],
  data() {
    return {
      state,
    };
  },
  components: {
    Banner,
    TextInput,
    BookItemList,
    BookByCategory,
    AdminSearch,
  },
  methods: {},
  mounted() {},
  // <BookItemList :isInCart=false title="Top books"/>
  template: `
      <div>
        <Banner v-if="!(state.user == undefined ? false : state.user.role == 'admin')"/>
        <AdminSearch v-else/>
        <BookByCategory title="Popular"/>
      </div>
    `,
};

export { Home };
