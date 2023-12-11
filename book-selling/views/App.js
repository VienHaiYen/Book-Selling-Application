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
  },
  data() {
    return {};
  },
  methods: {},
  template: `
    <Setting  />
  `,
};

export default App;
