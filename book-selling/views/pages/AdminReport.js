import { BookItemList, BackButton } from "../components/index.js";

const AdminReport = {
  props: {},
  components: {
    BookItemList,
    BackButton,
  },
  data() {
    return {
      // state,
    };
  },
  methods: {},
  mounted() {},
  template: `
    <div>
      <BackButton />
      <h1>Admin Report</h1>
    </div>
  `,
};

export { AdminReport };
