import state from "../../stores/app-state.js";
const Modal = {
  props: {
    title: String,
    description: String,
    buttonName: String,
    id: String,
    callback: Function,
  },
  data() {
    return {
      state,
    };
  },
  methods: {},
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
            {{ description }} {{state.bookIdDeleteSelected}}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="callback" aria-hidden="true" >Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `,
};

export { Modal };
