import { BookItemList, Spinner } from "../components/index.js";

import state from "../stores/app-state.js";

const BookPageByCate = {
  data() {
    return {
      state,
      bookList: Array,
      meta: {},
      // perpage: 60,
      category: {},
      author: {},
      readMode: true,
    };
  },
  components: {
    BookItemList,
    Spinner,
  },
  methods: {
    async getBookListByCate(page = 1) {
      this.bookList = [];
      $("html, body").animate({ scrollTop: 0 }, "slow");
      state.onLoading = true;
      await axios
        .get(`categories/${state.categorySelected}`)
        .then((res) => {
          console.log(res);
          this.bookList = res.data.data.books.filter(
            (item) => item.status == true
          );
          this.category = res.data.data.category;
          // this.meta = res.data.meta;
        })
        .catch((err) => {
          console.error(err);
        });
      state.onLoading = false;
    },
    async getBookListByAuthor(page = 1) {
      this.bookList = [];
      $("html, body").animate({ scrollTop: 0 }, "slow");
      state.onLoading = true;
      await axios
        .get(`authors/detail/${state.authorSelected}`)
        .then((res) => {
          this.bookList = res.data.data.books.filter(
            (item) => item.status == true
          );
          this.author = res.data.data.author;
          // this.meta = res.data.meta;
        })
        .catch((err) => {
          console.error(err);
        });
      state.onLoading = false;
    },
    async deleteBook() {
      await axios
        .delete("/books/" + state.bookIdDeleteSelected)
        .then((res) => {
          alert("Delete book successfully!");
          this.getBookListByCate();
        })
        .catch((err) => {
          alert("Delete book failed!");
          console.error(err);
        });
      $("#deleteBook").modal("hide");
      $(".modal-backdrop").hide();
      $("body").removeClass("modal-open");
      $("body").css("overflow", "auto");
    },
    navigate(screen) {
      state.view = screen;
    },
  },
  watch: {
    // Sử dụng watch để theo dõi sự thay đổi của state
    "state.categorySelected": "getBookListByCate",
    "state.authorSelected": "getBookListByAuthor",
  },
  async mounted() {
    this.$watch("state.categorySelected", this.getBookListByCate);
    this.$watch("state.authorSelected", this.getBookListByAuthor);

    state.categorySelected
      ? await this.getBookListByCate()
      : await this.getBookListByAuthor();
  },

  destroyed() {
    state.categorySelected = undefined;
    state.authorSelected = undefined;
  },

  template: `
      <h1 v-if="state.categorySelected" class="my-3">Category: {{category.name}}</h1>
      <h1 v-if="state.authorSelected" class="my-3">Author: {{author.name}}</h1>
      <Spinner v-if="state.onLoading" />
      <BookItemList :books="bookList" title="Popular"/>
    `,
};

export { BookPageByCate };
