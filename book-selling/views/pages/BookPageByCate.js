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
    async deleteBook() {
      await axios
        .delete("/books/" + state.bookIdDeleteSelected)
        .then((res) => {
          console.log(res.data);
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
  async mounted() {
    await this.getBookListByCate();
  },

  template: `
      <h1 class="my-3">Category: {{category.name}}</h1>
      <Spinner v-if="state.onLoading" />
      <BookItemList :books="bookList" title="Popular"/>
    `,
};

export { BookPageByCate };
