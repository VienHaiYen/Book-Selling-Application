import {
  Banner,
  BookItemList,
  BookByCategory,
  Pagination,
  Spinner,
  Modal,
  BookSearchBar,
  BackButton,
  Dropdown,
} from "../components/index.js";

import state from "../stores/app-state.js";

const Home = {
  data() {
    return {
      state,
      bookList: Array,
      categories: Array,
      category: {},
      meta: {},
      perpage: 60,
      readMode: true,
      isAllBookUser: false,
      minFilter: "",
      maxFilter: "",
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
    BackButton,
    Dropdown,
  },
  computed: {
    books() {
      return state.bannerList?.data
        .filter((item) => item.status == true)
        .slice(0, 6);
    },
  },
  methods: {
    async getCategoryList() {
      axios
        .get("/categories")
        .then((res) => {
          let data = res.data;
          this.categories = data.filter((cate) => cate.status == true);
        })
        .catch((err) => {
          console.error(err);
        });
    },
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
    async getBookListByCate(categoryId) {
      this.bookList = [];
      $("html, body").animate({ scrollTop: 0 }, "slow");
      state.onLoading = true;
      await axios
        .get(`categories/${categoryId}`)
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
    handleGetBookByCate(category) {
      this.meta = {};
      this.getBookListByCate(category);
      console.log(44, category);
    },
    getFilter() {
      if (this.minFilter == "" && this.maxFilter == "") {
        this.getBookList();
      } else {
        this.bookList = this.bookList.filter((book) => {
          if (this.minFilter == "") {
            return book.price <= this.maxFilter;
          } else if (this.maxFilter == "") {
            return book.price >= this.minFilter;
          } else {
            return book.price >= this.minFilter && book.price <= this.maxFilter;
          }
        });
      }
    },
  },
  async mounted() {
    await this.getBookList();
    if (state.user == undefined ? false : state.user.role == "admin") {
      await this.getCategoryList();
    }
  },

  template: `
      <Spinner v-if="state.onLoading" />

      <!-- User -->
      <div v-else>
      <Modal id="deleteBook" title="Delete Book" description="Do you want remove this book ?" :callback="deleteBook"/>

        <div v-if="!(state.user == undefined ? false : state.user.role == 'admin')">
          <div v-if="!isAllBookUser">
            <BackButton />
            <Banner />
            <div class="d-flex justify-content-between mx-3 mt-3">
              <h2>Popular</h2>
              <button class="btn btn-outline-primary" @click="this.changeBookDisplayMode">See all</button>
            </div>
            <BookItemList :books="books"/>
          </div>
          <div v-else>
            <button type="button" class="btn btn-primary m-2" @click="this.changeBookDisplayMode"><i class="fas fa-arrow-left"></i></button>
            <div class="d-flex justify-content-between">
              <h1>All Books</h1>
              <div>
                Filter by price:
                <div class="d-flex">
                  <input v-model="minFilter" style="height:40px" class="form-control mx-2" type="search" placeholder="Min" /> <p class="mt-2">to </p>
                  <input v-model="maxFilter" style="height:40px" class="form-control mx-2" type="search" placeholder="Max" />
                  <button class="btn btn-primary" @click="this.getFilter()">Filter</button>
                </div>
              </div>
            </div>
            <BookItemList :books="bookList"/>
            <Pagination v-if="meta.total" :totalPages="Math.ceil(meta.total/perpage)" :total="meta.total" :currentPage="meta.page" @pagechanged="this.getBookList" />
          </div>
        </div>

        <!-- Admin -->
        <div v-else>
          <div class="d-flex justify-content-between mt-2">
            <div>
              <span></span>
              <BackButton />
            </div>
            <BookSearchBar />
          </div>
          <div class="d-flex justify-content-between mt-2">
            <!-- Button  -->
            <button type="button" class="btn btn-primary m-2" @click="this.navigate('AddBook')">
              Add book
            </button>
            <div class=d-flex>
              <div class="d-flex align-items-center mx-2"><span>Read By: </span></div>
              <select style="width:150px" v-model="readMode" @change="console.log(readMode)" class="form-select mr-3">
                <option :value=true>All Books</option>
                <option :value=false>By Category</option>
              </select>
              <Dropdown label="Categories" v-if="!readMode && categories" :isAdmin=true iconLeft="fa-solid fa-table-cells-large" :handleGetBookByCate="this.handleGetBookByCate" :dropdownMenu="categories"/>
              <div v-if="readMode" class="d-flex align-items-center mx-2"><span>Perpage: </span></div>
              <select v-if="readMode" style="width:100px" v-model="perpage" @change="this.getBookList(1)" class="form-select" aria-label="Default select example">
                <option value="30">30</option>
                <option selected value="60">60</option>
                <option value="120">120</option>
              </select>
            </div>
          </div>
          <h2 class="mx-3">{{category.name?category.name:""}}</h2>
          <Spinner v-if="!bookList.length" />
          <BookItemList :books="bookList"/>
          <Pagination v-if="meta.total" :totalPages="Math.ceil(meta.total/perpage)" :total="meta.total" :currentPage="meta.page" @pagechanged="this.getBookList" />
        </div>
      </div>
    `,
};

export { Home };
