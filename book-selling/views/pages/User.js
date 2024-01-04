import { UserList, AdminSearch } from "../components/index.js";

const User = {
  components: { UserList, AdminSearch },
  data() {
    return {};
  },
  methods: {},

  mounted() {},

  template: `
    <div>
      <AdminSearch />
      <UserList/>
    </div>
  `,
};

export { User };
