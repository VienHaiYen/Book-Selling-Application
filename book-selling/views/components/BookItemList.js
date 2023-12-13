import { BookItem } from "./BookItem.js";

const BookItemList = {
  data() {
    return {
      data: Object,
    };
  },
  components: {
    BookItem,
  },
  methods: {},
  mounted() {},
  template: `
    <div class="d-flex flex-wrap">
      <BookItem v-for="index in 12" :key="index"/>
    </div>
  `,
};
export { BookItemList };
