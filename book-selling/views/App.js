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
} from "./pages/index.js";

import { Footer, Navbar } from "./components/index.js";
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
  },
  data() {
    return {
      isLogin: true,
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
    <Navbar @changeView="changeView" :avatarImg="avatarImg" :isLogin="isLogin"/>
      <component :is="state.view"></component>
    <Footer />
  `,
};

export default App;
