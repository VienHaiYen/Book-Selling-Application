import state from "../stores/app-state.js";
import { BookItem } from "./BookItem.js";

const BookItemList = {
  props: {
    title: String,
  },
  data() {
    return {
      state,
    };
  },
  components: {
    BookItem,
  },
  methods: {},
  mounted() {},
  template: `
      <div class="mx-2">
        <h2>{{title}}</h2>
        <div class="m-0 d-flex flex-wrap justify-content-start ">
          <BookItem v-for="(movie,index) in state.bannerList.slice(0,10)" :movie="movie" :key="index"/>
        </div>
      </div>
  `,
};
export { BookItemList };
