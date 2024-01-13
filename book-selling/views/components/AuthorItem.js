const AuthorItem = {
  props: {
    author: Object, // required
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  template: `
    <div class="col-6 col-md-4">
      <div class="card m-2">
        <div class="card-body">
          <h5 class="card-title">{{author.name}}</h5>
        </div>
      </div>
    </div>
    `,
};

export { AuthorItem };
