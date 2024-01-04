const Pagination = {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
    },
    onClickFirstPage() {
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit("pagechanged", this.totalPages);
    },
  },
  mounted() {
    // console.log(44, totalPages, total, currentPage);
  },

  template: `
  <ul v-if="totalPages" class="pagination">
    <li class="pagination-item">
      <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage">
        <i class="fas fa-angle-double-left"></i>
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage">
        <i class="fas fa-angle-left"></i>
      </button>
    </li>

    <li v-for="page in totalPages" class="pagination-item">
      <button type="button" @click="onClickPage(page)" :disabled="page.isDisabled" :class="{ active: isPageActive(page) }">
        {{ page }}
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        <i class="fas fa-angle-right"></i>
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        <i class="fas fa-angle-double-right"></i>
      </button>
    </li>
  </ul>`,
};

export { Pagination };
