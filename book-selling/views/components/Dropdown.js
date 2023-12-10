const Dropdown = {
  props: {
    label: String, // required
    dropdownMenu: Array,
    iconLeft: String
  },
  data() {
    return {}
  },
  methods: {
  },
  mounted() {
  },
  template:
    `
    <div class="dropdown">
      <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i v-if="this.iconLeft" :class="this.iconLeft"></i>
        {{ this.label }}
      </button>
      <ul class="dropdown-menu">
        <li v-for="(each,index) in this.dropdownMenu">
          <a :id="'item' + index" class="dropdown-item" href="#">{{ each.title }}</a>
        </li>
      </ul>
    </div>
    `
}

export { Dropdown }
