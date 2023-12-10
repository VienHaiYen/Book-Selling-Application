import { SignIn, Register, ForgotPassword } from "/pages/index.js";

const App = {
  components: {
    SignIn,
    Register,
    ForgotPassword,
  },
  data() {
    return {};
  },
  methods: {},
  template: `
    <SignIn />
  `,
};

export default App;
