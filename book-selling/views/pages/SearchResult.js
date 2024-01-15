import { BookItemList, AuthorItemList } from "../components/index.js";
import state from "../../stores/app-state.js";
const SearchResult = {
  components: {
    BookItemList,
    AuthorItemList,
  },
  data() {
    return {
      state,
      books: [],
      authors: [],
      categories: [],
    };
  },
  methods: {
    navigate: (screen) => {
      state.view = screen;
    },
  },
  mounted() {},
  template: `
    <div>
      <h2 class="text-center my-5">Author Result</h2>
      <AuthorItemList :authors="state.searchResult.authors"/>
      <h2 class="text-center my-5">Books Result</h2>
      <BookItemList :books="state.searchResult.books.filter(item=>item.status==true)"/>
    </div>
  `,
};

export { SearchResult };
