import {
  BookItemList,
  AuthorItemList,
  BackButton,
  Pagination,
} from "../components/index.js";
import state from "../../stores/app-state.js";
const SearchResult = {
  components: {
    BookItemList,
    AuthorItemList,
    BackButton,
    Pagination,
  },
  data() {
    return {
      state,
      books: [],
      meta: {},
      authors: [],
      categories: [],
    };
  },
  methods: {
    navigate: (screen) => {
      state.view = screen;
    },
    async getBookList(page = 1) {
      this.bookList = [];
      $("html, body").animate({ scrollTop: 0 }, "slow");
      await axios
        .get("/books/?page=" + page + "&pageSize=60")
        .then((res) => {
          this.books = res.data.data.filter((book) => book.status == true);
          this.meta = res.data.meta;
          console.log(this.meta);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  computed: {
    bookList() {
      return state.searchResult.books.filter((item) => item.status == true);
    },
  },
  mounted() {
    if (!state.searchResult) {
      this.getBookList();
    }
  },
  template: `
    <div>
      <BackButton />
      <div v-if="state.searchResult">
        <h2 class="text-center my-5">Author Result</h2>
        <AuthorItemList :authors="state.searchResult.authors"/>
        <h2 class="text-center my-5">Books Result</h2>
        <BookItemList  :books="bookList"/>
      </div>
      <div v-else>
        <h1 class="m-2">Search Books</h1>
        <BookItemList :books="books"/>
        <Pagination v-if="meta.total" :totalPages="Math.ceil(meta.total/60)" :total="meta.total" :currentPage="meta.page" @pagechanged="this.getBookList" />
      </div>
    </div>
  `,
};

export { SearchResult };
