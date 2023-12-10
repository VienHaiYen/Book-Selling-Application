const InputMail = {
  data() {
    return {};
  },
  methods: {},

  mounted() {},

  template: `
            <form>
              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="email">User email</label>
                <div class="w-75 text-start">
                  <input required type="mail" id="email" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block mb-4">
                Next >>
              </button>

            </form>
  `,
};

export default InputMail;
