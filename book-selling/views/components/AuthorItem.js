import state from "../stores/app-state.js";

const AuthorItem = {
  props: {
    author: Object, // required
  },
  data() {
    return {};
  },
  methods: {
    navBookPageByCate(book_id) {
      state.authorSelected = book_id;
      state.view = "BookPageByCate";
    },
  },
  mounted() {},
  template: `
    <div class="col-6 col-md-4" @click="navBookPageByCate(author.id)">
      <div class="card m-2">
        <div class="card-body">
          <h5 class="card-title">{{author.name}}</h5>
        </div>
      </div>
    </div>
    `,
};

export { AuthorItem };
