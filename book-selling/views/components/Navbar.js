import { Dropdown } from "./Dropdown.js";
import { Avatar } from "./Avatar.js";
import state from "../stores/app-state.js";
const Navbar = {
  props: {
    isLogin: Boolean,
    avatarImg: String,
    categories: Array,
  },
  components: {
    Dropdown,
    Avatar,
  },
  data() {
    return {};
  },
  methods: {
    navigation(screen) {
      state.view = screen;
    },
    logOut() {
      axios
        .post("/logout")
        .then((res) => {
          state.user = undefined;
          state.view = "Home";
          alert("Log out successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {},
  template: `
    <nav id="navbar" class="navbar navbar-expand-lg bg-body-tertiary bg-white">
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
            <li class="nav-item dropdown">
              <Dropdown label="Categories" iconLeft="fa-solid fa-table-cells-large" :dropdownMenu="this.categories" />
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          <button v-if="!isLogin" class="btn btn-dark" style="margin-left:20px" @click="this.navigation('SignIn')">Sign In</button>
          <Avatar v-if="isLogin" style="margin-left:20px" :source="avatarImg" size="40px" @click="this.navigation('setting')" />
          <button v-if="isLogin" class="btn ml-2  " @click="this.navigation('MyCart')"><i class="fas fa-shopping-cart"></i></button>
          <button v-if="isLogin" class="btn btn-danger" style="margin-left:20px" @click="logOut" ><i class="fas fa-sign-out-alt"></i></button>
          </div>
      </div>
    </nav>
    `,
};

export { Navbar };
