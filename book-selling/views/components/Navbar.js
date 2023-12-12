import { Dropdown } from './index.js';

const Navbar = {
  components: {
    Dropdown,
  },
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    navigation(screen) {
      this.$emit('changeView', screen);
    }
  },
  mounted() {
    axios
      .get('/categories')
      .then((res) => {
        this.categories = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  template:
    `
    <nav id="navbar" class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" @click="this.navigation('home')">MeBook</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" @click="this.navigation('home')">
                <i class="fa-solid fa-house" />
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" @click="this.navigation('setting')">
                <i class="fa-solid fa-user icon" />
                Profile
              </a>
            </li>
            <li class="nav-item dropdown">
              <Dropdown label="Categories" iconLeft="fa-solid fa-table-cells-large" :dropdownMenu="this.categories" />
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
    `
};

export { Navbar };
