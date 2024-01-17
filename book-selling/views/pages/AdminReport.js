import { BookItemList, BackButton, MyChart } from "../components/index.js";

const AdminReport = {
  props: {},
  components: {
    BookItemList,
    BackButton,
    MyChart,
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
      <MyChart />
    </div>
  `,
};

export { AdminReport };
