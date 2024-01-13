const Avatar = {
  props: {
    source: String, // required
    size: String, // optional
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  template: `
    <img :src="source" alt="avatar"
                    class="rounded-circle  img-fluid avartar w-100 h-100" style="object-fit:cover">
    `,
};

export { Avatar };
