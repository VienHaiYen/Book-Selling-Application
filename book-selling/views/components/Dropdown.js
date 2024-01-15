import state from "../stores/app-state.js";

const Dropdown = {
  props: {
    label: String, // required
    dropdownMenu: Array,
    iconLeft: String,
    view: String,
  },
  data() {
    return {};
  },
  methods: {
    setCategorySelected(category) {
      console.log(category);
      state.categorySelected = category;
      state.authorSelected = undefined;
    },
    navigate(screen) {
      state.view = screen;
    },
  },
  mounted() {},
  template: `
    <div class="dropdown">
      <button class="btn dropdown-toggle nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i v-if="this.iconLeft" :class="this.iconLeft"></i>
        {{ this.label }}
      </button>
      <ul class="dropdown-menu">
        <li v-for="(each,index) in this.dropdownMenu">
          <a :id="each.id" class="dropdown-item" href="#" @click="this.navigate(view);this.setCategorySelected(each.id)">{{ each.name }}</a>
        </li>
      </ul>
    </div>
    `,
};

export { Dropdown };
