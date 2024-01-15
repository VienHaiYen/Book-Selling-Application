import { BackButton } from "../components/BackButton.js";
const AdminHome = {
  props: {},
  components: { BackButton },
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
      <div>Admin Home</div>
    </div>
  `,
};

export { AdminHome };
