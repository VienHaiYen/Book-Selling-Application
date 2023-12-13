import { Banner, TextInput, BookItemList } from "../components/index.js";

import state from "../stores/app-state.js";

const Home = {
  data() {
    return {
      books: [],
    };
  },
  components: {
    Banner,
    TextInput,
    BookItemList,
  },
  methods: {},
  mounted() {
    axios
      .get("/books")
      .then((res) => {
        this.books = res.data;
        state.bannerList = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  template: `
      <BookItemList />
    `,
};

export { Home };
