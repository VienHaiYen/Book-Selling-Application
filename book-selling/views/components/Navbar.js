import { Dropdown } from './index.js'

const Navbar = {
  components: {
    Dropdown,
  },
  data() {
    return {
      categories: [{ 'title': 'aaaa' }, { 'title': 'b' }], // WARNING: should change this -> get categories from db
    }
  },
  methods: {
    navigation(screen) {
      this.$emit('changeView', screen);
    }
  },
  template:
    `
    <nav id="navbar" class="navbar navbar-expand-lg rounded-3">
      <div class="container-fluid">
        <div class="d-flex align-items-center" style="gap:16px;">
          <i class="fa-solid fa-bars icon"></i>
          <Dropdown label="Categories" iconLeft="fa-solid fa-table-cells-large" :dropdownMenu="this.categories" />
        </div>
        <h4 style="cursor:pointer;" @click="this.navigation('home')">MeBook</h4>
        <div class="d-flex align-items-center" style="gap:16px;">
          <i class="fa-solid fa-magnifying-glass icon"></i>
          <i class="fa-solid fa-user icon" @click="this.navigation('setting')"></i>
          <i class="fa-solid fa-cart-shopping icon"></i>
        </div>
      </div>
    </nav>
    `
};

export { Navbar };
