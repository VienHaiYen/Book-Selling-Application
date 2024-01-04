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
  <div :class="{'d-flex':state.user == undefined ? false : state.user.role == 'admin'}">
    <Navbar v-if="!
    (state.user == undefined ? false : state.user.role == 'admin')" @changeView="changeView" :avatarImg="avatarImg" :isLogin="state.user != undefined"/>
    <SidebarAdmin v-else @changeView="changeView" :avatarImg="avatarImg" :isLogin="state.user != undefined"/>
        <component class=" flex-grow-1" :is="state.view" @changeView="changeView"></component>
  </div>
    <Footer />
  `,
};

export default App;
