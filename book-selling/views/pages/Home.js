import {
  Banner,
  TextInput,
  BookItemList,
  BookByCategory,
  AdminSearch,
  Pagination,
} from "../components/index.js";

import state from "../stores/app-state.js";

const Home = {
  data() {
    return {
      state,
      bookList: Array,
      meta: {},
      perpage: 60,
    };
  },
  components: {
    Banner,
    TextInput,
    BookItemList,
    BookByCategory,
    AdminSearch,
    Pagination,
  },
  methods: {
    async getBookList(page = 1) {
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
  mounted() {
    if (state.user != undefined) {
      if (state.user.role == "admin") {
        this.getBookList();
      }
    }
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
            <div class="d-flex align-items-center"><span>Perpage: </span></div>
            <select style="width:100px" v-model="perpage" @change="this.getBookList(1)" class="form-select" aria-label="Default select example">
              <option value="30">30</option>
              <option selected value="60">60</option>
              <option value="120">120</option>
            </select>
          </div>
          <BookItemList :books="bookList"/>
          <Pagination :totalPages="Math.ceil(meta.total/perpage)" :total="meta.total" :currentPage="meta.page" @pagechanged="this.getBookList" />
        </div>
      </div>
    `,
};

export { Home };
