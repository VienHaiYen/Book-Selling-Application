import {
  SignIn,
  Register,
  ForgotPassword,
  Setting,
  EditProfile,
} from "/pages/index.js";

import { Dropdown, Footer, Navbar } from "/components/index.js";

const App = {
  components: {
    SignIn,
    Register,
    ForgotPassword,
    Setting,
    EditProfile,
    Footer,
    Navbar,
  },
  data() {
    return {};
  },
  methods: {},
  template: `
    <Navbar />
    <Setting  />
    <Footer />
  `,
};

export default App;
