const AdminSearch = {
  props: {},
  components: {},
  data() {
    return {
      categories: [],
    };
  },
  methods: {
    navigation(screen) {
      this.$emit("changeView", screen);
    },
  },
  mounted() {},
  template: `
    <nav id="navbar" class="navbar navbar-expand-lg bg-body-tertiary ">
      <div class="container-fluid">
        <a class="navbar-brand" @click="this.navigation('home')">MeBook</a>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
    `,
};

export { AdminSearch };
