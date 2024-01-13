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
} from "./pages/index.js";

import { Footer, Navbar, SidebarAdmin } from "./components/index.js";
import state from "../stores/app-state.js";

const App = {
  components: {
    Home,
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
    SidebarAdmin,
    // admin
    AdminReport,
    User,
    AddBook,
    EditBook,
  },
  data() {
    return {
      avatarImg:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
      state,
      categories: [],
    };
  },

  methods: {},
  async created() {
    axios
      .get("/categories")
      .then((res) => {
        this.categories = res.data;
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get("/auth")
      .then((res) => {
        console.log(res.data);
        state.user = res.data;
      })
      .catch((err) => {
        // console.log(err);
        console.log("Not in session");
      });
    await axios
      .get("/books")
      .then((res) => {
        state.bannerList = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  // / <BookDetail id="10"/>
  mounted() {},
  template: `
  <div class="main-container">
  <div :class="{'d-flex':state.user == undefined ? false : state.user.role == 'admin'}">
    <Navbar v-if="!
    (state.user == undefined ? false : state.user.role == 'admin')" :avatarImg="avatarImg" :categories="categories" :isLogin="state.user != undefined"/>
    <SidebarAdmin v-else :avatarImg="avatarImg" :isLogin="state.user != undefined"/>
        <component class=" flex-grow-1" :is="state.view"></component>
  </div>
    <Footer />
    </div>
  `,
};

export default App;
