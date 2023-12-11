import { Navbar, TextInput } from '../components/index.js';

const Home = {
  data() {
    return {
      books: [],
    };
  },
  components: {
    Navbar,
    TextInput,
  },
  methods: {},
  mounted() {
    axios
      .get('/books')
      .then((response) => {
        this.books = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  template:
    `
      <Navbar />
    `
};

export { Home };
