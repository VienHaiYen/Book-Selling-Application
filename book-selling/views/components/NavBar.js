const Navbar = {
  data() {
    return {
      searchString: ""
    }
  },
  methods() {
    // Handle Search here
  },
  template:
    `
    <nav id="navbar" class="navbar navbar-expand-lg rounded-3">
      <div class="container-fluid">
        <h4 style="cursor:pointer;">Home</h4>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-success" preventDefault>Search</button>
        </form>
      </div>
    </nav>
    `
};

export { Navbar };
