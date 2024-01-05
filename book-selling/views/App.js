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
  AdminReport,
  User,
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
    MyCart,
    BookDetail,
    OrderSummary,
    SidebarAdmin,
    // admin
    AdminReport,
    User,
  },
  data() {
    return {
      avatarImg:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
      state,
    };
  },

  methods: {},
  async created() {
    if (localStorage.getItem("user") != undefined) {
      state.user = JSON.parse(localStorage.getItem("user"));
    }
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
  <div :class="{'d-flex':state.user == undefined ? false : state.user.role == 'admin'}">
    <Navbar v-if="!
    (state.user == undefined ? false : state.user.role == 'admin')" :avatarImg="avatarImg" :isLogin="state.user != undefined"/>
    <SidebarAdmin v-else :avatarImg="avatarImg" :isLogin="state.user != undefined"/>
        <component class=" flex-grow-1" :is="state.view"></component>
  </div>
    <Footer />
  `,
};

export default App;
