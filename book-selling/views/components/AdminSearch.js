import state from "../stores/app-state.js";

const AdminSearch = {
  props: {},
  components: {},
  data() {
    return {
      categories: [],
      inputSearch: "",
    };
  },
  methods: {
    navigation(screen) {
      state.view = screen;
    },
    search(e) {
      e.preventDefault();
      state.userSearchInput = this.inputSearch;
      console.log(state.userSearchInput);
    },
  },
  mounted() {},
  template: `
    <nav id="navbar" class="navbar navbar-expand-lg bg-body-tertiary ">
      <div class="container-fluid">
        <a class="navbar-brand" @click="this.navigation('home')">MeBook</a>
        <form class="d-flex" role="search">
          <input v-model="inputSearch" class="form-control me-2" type="search" placeholder="Search by email" aria-label="Search">
          <button class="btn btn-outline-success" type="submit" @click="this.search">Search</button>
        </form>
      </div>
    </nav>
    `,
};

export { AdminSearch };
