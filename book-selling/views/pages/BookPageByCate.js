import { BookItemList, Spinner, BackButton } from "../components/index.js";

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
    BackButton,
  },
  methods: {
    async getBookListByCate(page = 1) {
      if (!state.categorySelected) return;
      this.bookList = [];
      $("html, body").animate({ scrollTop: 0 }, "slow");
      state.onLoading = true;
      await axios
        .get(`categories/${state.categorySelected}`)
        .then((res) => {
          let tmp = res.data.data.books.filter((item) => item.status == true);
          this.bookList = tmp;
          this.category = res.data.data.category;
          // this.meta = res.data.meta;
        })
        .catch((err) => {
          console.error(err);
        });
      state.onLoading = false;
    },
    async getBookListByAuthor(page = 1) {
      if (!state.authorSelected) return;
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

    if (state.categorySelected || state.authorSelected) {
      if (state.categorySelected) {
        localStorage.setItem("categoryId", state.categorySelected);
        localStorage.removeItem("authorId");
      } else if (state.authorSelected) {
        localStorage.setItem("authorId", state.authorSelected);
        localStorage.removeItem("categoryId");
      }

      state.categorySelected
        ? await this.getBookListByCate()
        : await this.getBookListByAuthor();
      return;
    }

    if (state.categorySelected) {
      localStorage.setItem("categoryId", state.categorySelected);
    } else if (localStorage.getItem("categoryId")) {
      state.categorySelected = localStorage.getItem("categoryId");
    }

    if (state.authorSelected) {
      localStorage.setItem("authorId", state.authorSelected);
    } else if (localStorage.getItem("authorId")) {
      state.authorSelected = localStorage.getItem("authorId");
    }
  },

  destroyed() {
    state.categorySelected = undefined;
    state.authorSelected = undefined;
  },

  template: `
      <div class="m-3">
        <BackButton />
        <h1 v-if="state.categorySelected" class="my-3">Category: {{category.name}}</h1>
        <h1 v-if="state.authorSelected" class="my-3">Author: {{author.name}}</h1>
        <Spinner v-if="state.onLoading" />
        <BookItemList :books="bookList" title="Popular"/>
      </div>
    `,
};

export { BookPageByCate };
