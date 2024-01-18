import {
  BookItemList,
  BackButton,
  MyChart,
  Spinner,
} from "../components/index.js";

const AdminReport = {
  props: {},
  components: {
    BookItemList,
    BackButton,
    MyChart,
    Spinner,
  },
  data() {
    return {
      // state,
      overall: {},
      onLoading: false,
      thisWeekData: [],
    };
  },
  methods: {
    async getOverallReport() {
      await axios.get("/dashboard/overall").then((res) => {
        // console.log(res.data.data);
        this.overall = res.data.data;
        this.onLoading = false;
      });
    },
    async getThisWeekReport() {
      await axios.get("/dashboard/detail?reportType=week").then((res) => {
        this.thisWeekData = res.data.data.detail;
        // console.log(this.thisWeekData);
      });
    },
  },
  async mounted() {
    this.onLoading = true;
    await this.getOverallReport();
    await this.getThisWeekReport();
  },
  template: `
    <div class="container m-3">
      <BackButton />
      <h1>Admin Report</h1>
      <Spinner v-if="onLoading" />
      <div v-if="overall.week" class="row border border-danger border-2 p-3 mb-3 chakra-font">
        <div class="col-md-3">
            <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                <h3>Today</h3>
                <p>Total order:  {{overall.today.total_orders}}</p>
                <p>Total client:  {{overall.today.total_clients}}</p>
                <p>Total sales:  {{overall.today.total_sales}}</p>
                <p>Total revenue: $ {{overall.today.total_revenue}}</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                <h3>This week</h3>
                <p>Total order:  {{overall.week.total_orders}}</p>
                <p>Total client:  {{overall.week.total_clients}}</p>
                <p>Total sales:  {{overall.week.total_sales}}</p>
                <p>Total revenue: $ {{overall.week.total_revenue}}</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                <h3>This Month</h3>
                <p>Total order:  {{overall.month.total_orders}}</p>
                <p>Total client:  {{overall.month.total_clients}}</p>
                <p>Total sales:  {{overall.month.total_sales}}</p>
                <p>Total revenue: $ {{overall.month.total_revenue}}</p>
            </div>
        </div>
        <div class="col-md-3">
            <div class="mx-auto features-icons-item mb-5 mb-lg-0 mb-lg-3">
                <h3>This Year</h3>
                <p>Total order:  {{overall.year.total_orders}}</p>
                <p>Total client:  {{overall.year.total_clients}}</p>
                <p>Total sales:  {{overall.year.total_sales}}</p>
                <p>Total revenue: $ {{overall.year.total_revenue}}</p>
            </div>
        </div>
        </div>
      <h3>Sale This week</h3>
      <MyChart v-if="thisWeekData.length>0" :data="thisWeekData"/>
    </div>
  `,
};

export { AdminReport };
