import {
  Home,
  SignIn,
  Register,
  ForgotPassword,
  Setting,
  EditProfile,
  MyCart,
  BookDetail,
  OrderSummary,
  OrderHistory,
  OrderDetail,
  AdminReport,
  User,
  AddBook,
  EditBook,
  SearchResult,
  Category,
  BookPageByCate,
  TransferHistory,
} from "./pages/index.js";

import { Footer, Navbar, SidebarAdmin } from "./components/index.js";
import state from "../stores/app-state.js";

const App = {
  components: {
    Home,
    BookPageByCate,
    SignIn,
    Register,
    ForgotPassword,
    Setting,
    EditProfile,
    Footer,
    Navbar,
    SearchResult,
    MyCart,
    BookDetail,
    OrderSummary,
    OrderHistory,
    OrderDetail,
    TransferHistory,

    // admin
    SidebarAdmin,
    AdminReport,
    User,
    AddBook,
    EditBook,
    Category,
  },
  data() {
    return {
      avatarImg:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
      state,
      categories: [],
    };
  },
  methods: {
    handleStoreViewToLocalStorage() {
      localStorage.setItem("view", state.view);
      if (state.viewStack[state.viewStack.length - 1] == state.view) return;
      if (
        (state.viewStack[state.viewStack.length - 1] != "SignIn" ||
          state.viewStack[state.viewStack.length - 1] != "Register") &&
        state.view != "OrderSummary" &&
        state.user != undefined
      ) {
        state.viewStack.push(state.view);
      }
    },
  },
  watch: {
    "state.view": "handleStoreViewToLocalStorage",
  },
  async created() {
    await axios
      .get("/categories")
      .then((res) => {
        this.categories = res.data.filter((cate) => cate.status == true);
      })
      .catch((err) => {
        console.error(err);
      });

    await axios
      .get("/auth")
      .then((res) => {
        console.log("xx", res.data);
        state.user = res.data;
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        // console.log(err);
        console.log("Not in session");
      });
    await axios
      .get("/books?pageSize=20")
      .then((res) => {
        state.bannerList = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  mounted() {
    this.$watch(() => state.view, this.handleStoreViewToLocalStorage);
    if (localStorage.getItem("view") == null) {
      localStorage.setItem("view", "Home");
    }
    state.view = localStorage.getItem("view");
    state.viewStack.push(state.view);
  },
  template: `
  <div v-if="state.view!=undefined" class="main-container">
    <div :class="{'d-flex':state.user == undefined ? false : state.user.role == 'admin'}">
      <Navbar v-if="!
      (state.user == undefined ? false : state.user.role == 'admin')" :avatarImg="avatarImg" :categories="categories" :isLogin="state.user != undefined"/>
      <SidebarAdmin v-else :avatarImg="avatarImg" :isLogin="state.user != undefined"/>
        <component class="flex-grow-1" :is="state.view"></component>
    </div>
    <!-- <Footer /> -->
  </div>
  `,
};

export default App;
