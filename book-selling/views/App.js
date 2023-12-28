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
  AdminHome,
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
    AdminHome,
    User,
  },
  data() {
    return {
      isLogin: false,
      avatarImg:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
      state,
      isAdmin: false,
    };
  },
  methods: {
    changeView(type) {
      state.view = type;
    },
  },
  async created() {
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
  // <component :is="view" @changeView="changeView"></component>
  // <component :is="state.view"></component>
  template: `
  <div :class="{'d-flex':isAdmin}">
    <Navbar v-if="!isAdmin" @changeView="changeView" :avatarImg="avatarImg" :isLogin="isLogin"/>
    <SidebarAdmin v-else @changeView="changeView" :avatarImg="avatarImg" :isLogin="isLogin"/>
        <component :is="state.view"></component>
  </div>
    <Footer />
  `,
};

export default App;
