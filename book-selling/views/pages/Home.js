import { Navbar, TextInput } from '../components/index.js'

const Home = {
  data() {
    return {};
  },
  components: {
    Navbar,
    TextInput,
  },
  methods: {},
  mounted() { },
  template:
    `
      <Navbar />
      <TextInput />
      <div>aaaa</div>
    `
};

export { Home };
