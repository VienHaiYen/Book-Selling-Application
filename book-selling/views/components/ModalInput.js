import state from "../../stores/app-state.js";
const ModalInput = {
  props: {
    title: String,
    description: String,
    categoryName: String,
    buttonName: String,
    id: String,
    // callback: Function,
  },
  data() {
    return {
      state,
      newString: "",
    };
  },
  methods: {
    changeValue() {
      if (this.newString == "") {
        alert("Please enter a value");
        return;
      }
      this.$emit("callback", this.newString);
    },
    onChange(e) {
      console.log(e.target.value);
    },
  },
  mounted() {},
  template: `
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          </div>
          <div class="modal-body">
            <!-- {{ description }}  -->
            <input v-if="categoryName" v-model="categoryName" disabled class="form-control me-2 my-3" aria-label="Category Name">
            <input v-model="newString"  class="form-control me-2" aria-label="Category Name">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" aria-hidden="true" @click="changeValue">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `,
};

export { ModalInput };
