import {
  Home,
  SignIn,
  Register,
  ForgotPassword,
  Setting,
  EditProfile,
} from "./pages/index.js";

import { Footer, Navbar } from './components/index.js';

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
  },
  data() {
    return {
      view: 'Home',
    };
  },
  methods: {
    changeView(type) {
      if (type === "setting") {
        this.view = "Setting"
      }
      if (type === "home") {
        this.view = "Home"
      }
    },
  },
  template: `
    <Navbar @changeView="changeView" />
    <component :is="view" @changeView="changeView"></component>
    <Footer />
  `,
};

export default App;
