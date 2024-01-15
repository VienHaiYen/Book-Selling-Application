import state from "../stores/app-state.js";
const BackButton = {
  props: {},
  data() {
    return {
      state,
    };
  },
  methods: {
    back() {
      state.viewStack.pop();
      state.view = state.viewStack[state.viewStack.length - 1];
    },
  },
  template: `
      <button v-if="state.viewStack.length!=1" class="btn btn-outline-primary mt-3 mx-3" @click="this.back"><i class="fas fa-arrow-left"></i> Back</button>
    `,
};

export { BackButton };
