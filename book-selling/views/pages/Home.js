import {
  Banner,
  BookItemList,
  BookByCategory,
  Pagination,
  Spinner,
  Modal,
  BookSearchBar,
} from "../components/index.js";

import state from "../stores/app-state.js";

const Home = {
  data() {
    return {
      state,
      bookList: Array,
      meta: {},
      perpage: 60,
      readMode: true,
      isAllBookUser: false,
    };
  },
  components: {
    Banner,
    BookItemList,
    BookByCategory,
    Pagination,
    Spinner,
    Modal,
    BookSearchBar,
  },
  computed: {
    books() {
      console.log(state.bannerList?.data);
      return state.bannerList?.data
        .filter((item) => item.status == true)
        .slice(0, 6);
    },
  },
  methods: {
    async getBookList(page = 1) {
      this.bookList = [];
      $("html, body").animate({ scrollTop: 0 }, "slow");
      state.onLoading = true;
      await axios
        .get("/books/?page=" + page + "&pageSize=" + this.perpage)
        .then((res) => {
          this.bookList = res.data.data.filter((book) => book.status == true);
          this.meta = res.data.meta;
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
          this.getBookList();
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
    changeBookDisplayMode() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      this.isAllBookUser = !this.isAllBookUser;
    },
  },
  async mounted() {
    await this.getBookList();
  },

  template: `
      <Spinner v-if="state.onLoading" />

      <!-- User -->
      <div v-else>
      <Modal id="deleteBook" title="Delete Book" description="Do you want remove this book ?" :callback="deleteBook"/>

        <div v-if="!(state.user == undefined ? false : state.user.role == 'admin')">
          <div v-if="!isAllBookUser">
            <Banner />
            <div class="d-flex justify-content-between mx-3 mt-3">
              <h2>Popular</h2>
              <button class="btn btn-outline-primary" @click="this.changeBookDisplayMode">See all</button>
            </div>
            <BookItemList :books="books"/>
          </div>
          <div v-else>
            <button type="button" class="btn btn-primary m-2" @click="this.changeBookDisplayMode"><i class="fas fa-arrow-left"></i></button>
            <h1>All Books</h1>
            <BookItemList :books="bookList"/>
          </div>
        </div>

        <!-- Admin -->
        <div v-else>
          <BookSearchBar />
          <div class="d-flex justify-content-between mt-2">
            <!-- Button  -->
            <button type="button" class="btn btn-primary m-2" @click="this.navigate('AddBook')">
              Add book
            </button>
            <div class=d-flex>
              <div class="d-flex align-items-center mx-2"><span>Read By: </span></div>
              <select style="width:150px" v-model="readMode" @change="this.getBookList(1)" class="form-select mr-3" aria-label="Default select example">
                <option value="true">All Books</option>
                <option value="false">By Category</option>
              </select>
              <div class="d-flex align-items-center mx-2"><span>Perpage: </span></div>
              <select style="width:100px" v-model="perpage" @change="this.getBookList(1)" class="form-select" aria-label="Default select example">
                <option value="30">30</option>
                <option selected value="60">60</option>
                <option value="120">120</option>
              </select>
            </div>
          </div>
          <Spinner v-if="!bookList.length" />
          <BookItemList :books="bookList"/>
          <Pagination v-if="meta.total" :totalPages="Math.ceil(meta.total/perpage)" :total="meta.total" :currentPage="meta.page" @pagechanged="this.getBookList" />
        </div>
      </div>
    `,
};

export { Home };
