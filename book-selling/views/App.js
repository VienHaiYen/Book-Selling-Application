import { Home, SignIn, Register } from './pages/index.js'

const App = {
  components: {
    SignIn,
    Register,
    Home,
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
