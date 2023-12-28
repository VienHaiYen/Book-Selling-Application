import { UserItem, UserList, AdminSearch } from "../components/index.js";

const User = {
  components: { UserItem, UserList, AdminSearch },
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
