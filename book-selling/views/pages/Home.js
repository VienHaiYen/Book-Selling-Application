import {
  Banner,
  TextInput,
  BookItemList,
  BookByCategory,
  AdminSearch,
  Pagination,
  Spinner,
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
    };
  },
  components: {
    Banner,
    TextInput,
    BookItemList,
    BookByCategory,
    AdminSearch,
    Pagination,
    Spinner,
  },
  methods: {
    async getBookList(page = 1) {
      this.bookList = [];
      $("html, body").animate({ scrollTop: 0 }, "slow");
      await axios
        .get("/books/?page=" + page + "&pageSize=" + this.perpage)
        .then((res) => {
          this.bookList = res.data.data;
          this.meta = res.data.meta;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  async mounted() {
    axios.get("/auth").then((res) => {
      if (res.data.role == "admin") {
        this.getBookList();
      }
    });
  },

  template: `
      <div>
        <div v-if="!(state.user == undefined ? false : state.user.role == 'admin')">
          <Banner />
          <BookByCategory title="Popular"/>
        </div>
        <div v-else>
          <AdminSearch />
          <div class="d-flex justify-content-end">
            <div class=d-flex>
                <div class="d-flex align-items-center mx-2"><span>Read By: </span></div>
                <select style="width:150px" v-model="readMode" @change="this.getBookList(1)" class="form-select mr-3" aria-label="Default select example">
                  <option value="true">All Books</option>
                  <option value="false">By Category</option>
                </select>
            </div>
            <div class="d-flex">
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
