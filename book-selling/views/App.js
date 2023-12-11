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
    <EditProfile />
  `,
};

export default App;
