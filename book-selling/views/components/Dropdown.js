import state from "../stores/app-state.js";

const Dropdown = {
  props: {
    label: String, // required
    dropdownMenu: Array,
    iconLeft: String,
    view: String,
    isAdmin: Boolean,
    handleGetBookByCate: Function,
  },
  data() {
    return {};
  },
  methods: {
    setCategorySelected(category) {
      if (this.view) {
        state.view = screen;
      } else {
        this.handleGetBookByCate(category);
      }

      console.log(category);
      state.categorySelected = category;
      state.authorSelected = undefined;
    },
  },
  mounted() {
    console.log(this.dropdownMenu);
  },
  template: `
    <div class="dropdown">
      <button class="btn dropdown-toggle nav-link dropdown-toggle h-100" :class="isAdmin?'text-dark bg-white border mx-2':''" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i v-if="this.iconLeft" :class="this.iconLeft"></i>
        {{ this.label }}
      </button>
      <ul class="dropdown-menu">
        <li v-for="(each,index) in this.dropdownMenu">
          <a :id="each.id" class="dropdown-item" @click="this.setCategorySelected(each.id)">{{ each.name }}</a>
        </li>
      </ul>
    </div>
    `,
};

export { Dropdown };
