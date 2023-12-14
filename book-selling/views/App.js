import {
  Home,
  SignIn,
  Register,
  ForgotPassword,
  Setting,
  EditProfile,
  MyCart,
} from "./pages/index.js";

import { Footer, Navbar } from "./components/index.js";

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
      console.log(type);
      this.view = type;
    },
  },
  template: `
    <Navbar @changeView="changeView" :avatarImg="avatarImg" :isLogin="isLogin"/>
    <component :is="view" @changeView="changeView"></component>
    <Footer />
  `,
};

export default App;
