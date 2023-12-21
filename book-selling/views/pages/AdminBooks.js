import { AdminSearch, BookItemList } from "../components/index.js";

const AdminBooks = {
  props: {},
  components: {
    AdminSearch,
    BookItemList,
  },
  data() {
    return {
      // state,
    };
  },
  methods: {},
  mounted() {},
  template: `
    <div d-flex>
      <AdminSearch />
      <BookItemList :isInCart=false title="All books"/>

    </div>
  `,
};

export { AdminBooks };
