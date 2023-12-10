import { SignIn, Register, ForgotPassword, Setting } from "/pages/index.js";

const App = {
  components: {
    SignIn,
    Register,
    ForgotPassword,
    Setting,
  },
  data() {
    return {};
  },
  methods: {},
  template: `
    <Setting />
  `,
};

export default App;
