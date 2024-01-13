import { Dropdown } from "./Dropdown.js";

import { UserNav } from "./UserNav.js";
import { BookSearchBar } from "./BookSearchBar.js";
import state from "../stores/app-state.js";
const Navbar = {
  props: {
    isLogin: Boolean,
    avatarImg: String,
    categories: Array,
  },
  components: {
    Dropdown,
    UserNav,
    BookSearchBar,
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
          state.view = "SignIn";
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
          <BookSearchBar />
          <button v-if="!isLogin" class="btn btn-dark" style="margin-left:20px" @click="this.navigation('SignIn')">Sign In</button>
           <button v-if="isLogin" class="btn mx-3  " @click="this.navigation('MyCart')"><i class="fas fa-shopping-cart"></i></button>
          <UserNav :avatarImg="this.avatarImg"   v-if="isLogin" />
          </div>
      </div>
    </nav>
    `,
};

export { Navbar };
