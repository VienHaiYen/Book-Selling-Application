const DepositModal = {
  props: {
    title: String,
    description: String,
    categoryName: String,
    buttonName: String,
    callback: Function,
    id: String,
  },
  data() {
    return {
      newString: "",
    };
  },

  methods: {
    handle() {
      if (this.newString == "") {
        alert("Please enter a value");
        return;
      }
      let tmp = this.newString;
      // this.$emit("callback", tmp);
      this.callback(tmp);
      this.newString = "";
    },
  },
  mounted() {},
  detroyed() {
    this.newString = "";
  },

  template: `
    <!-- Modal -->
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          </div>
          <div class="modal-body">
            <input v-model="newString" type="number" :min="0" class="form-control me-2" aria-label="Category Name">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" aria-hidden="true" @click="handle">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `,
};

export { DepositModal };
