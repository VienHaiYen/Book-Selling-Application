import { AdminHome, AdminReport, User } from "./pages/index.js";

import { SidebarAdmin, Footer } from "./components/index.js";
import state from "../stores/app-state.js";

const AdminApp = {
  components: {
    AdminHome,
    AdminReport,
    SidebarAdmin,
    Footer,
    User,
  },
  data() {
    return {
      view: "AdminHome",
      isLogin: true,
      avatarImg:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
    };
  },
  methods: {
    changeView(type) {
      this.view = type;
    },
  },
  async created() {
    await axios
      .get("/books")
      .then((res) => {
        state.bannerList = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  mounted() {},
  template: `
    <div class= "d-flex">
      <SidebarAdmin @changeView="changeView" :avatarImg="avatarImg"/>
      <component :is="view" @changeView="changeView"></component>
    </div>
    <Footer />
  `,
};

export default AdminApp;
