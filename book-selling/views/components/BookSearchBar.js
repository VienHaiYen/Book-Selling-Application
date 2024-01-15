import state from "../stores/app-state.js";

const BookSearchBar = {
  data() {
    return {
      searchInput: "",
    };
  },

  methods: {
    async search(e) {
      e.preventDefault();
      await axios
        .get(`/search?q=${this.searchInput}`)
        .then((res) => {
          console.log(res.data);
          state.view = "SearchResult";
          state.searchResult = res.data;
          this.searchInput = "";
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },

  template: `
      <form class="d-flex justify-content-end my-1" role="search">
        <input v-model="searchInput" class="form-control me-2" style="max-width:200px" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" @click="this.search" type="submit">Search</button>
      </form>
  `,
};
export { BookSearchBar };
