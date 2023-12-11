import {
  SignIn,
  Register,
  ForgotPassword,
  Setting,
  EditProfile,
} from "/pages/index.js";

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
