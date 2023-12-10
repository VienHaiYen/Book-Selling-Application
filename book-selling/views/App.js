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
  method: {},
  template: `
    <SignIn />
  `,
};

export default App;
