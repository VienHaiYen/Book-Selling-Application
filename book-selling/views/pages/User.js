import { UserList, AdminSearch, BackButton } from "../components/index.js";

const User = {
  components: { UserList, AdminSearch, BackButton },
  data() {
    return {};
  },
  methods: {},

  mounted() {},

  template: `
    <div>
      <AdminSearch />
      <BackButton />
      <UserList />
    </div>
  `,
};

export { User };
