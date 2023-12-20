import {
  Home,
  SignIn,
  Register,
  ForgotPassword,
  Setting,
  EditProfile,
  MyCart,
  BookDetail,
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
  },
  data() {
    return {
      view: "Home",
      isLogin: true,
      avatarImg:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
    };
  },
  methods: {
    changeView(type) {
      this.view = type;
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
  mounted() {},
  // <component :is="view" @changeView="changeView"></component>
  template: `
    <Navbar @changeView="changeView" :avatarImg="avatarImg" :isLogin="isLogin"/>
    <BookDetail id="10"/>
    <Footer />
  `,
};

export default App;
