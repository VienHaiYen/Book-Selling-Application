import { UserItem, UserList } from "../components/index.js";

const User = {
  components: { UserItem, UserList },
  data() {
    return {};
  },
  methods: {},

  mounted() {},

  template: `
    <UserList/>
  `,
};

export { User };
