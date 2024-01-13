import state from "../stores/app-state.js";
import { AuthorItem } from "./index.js";

const AuthorItemList = {
  props: {
    authors: Array,
  },
  data() {
    return {
      state,
    };
  },
  components: {
    AuthorItem,
    state,
  },
  template: `

      <div class="mx-2">
        <div class="m-0 d-flex flex-wrap justify-content-start ">
          <AuthorItem v-for="(author,index) in authors" :author="author" :key="index" />
        </div>
      </div>
  `,
};
export { AuthorItemList };
