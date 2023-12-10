const ResetPasswordForm = {
  data() {
    return {};
  },
  methods: {},

  mounted() {},

  template: `
            <form>
              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="password">Password</label>
                <div class="w-75 text-start">
                  <input required type="password" id="password" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="repeat-password">Repeat your password</label>
                <div class="w-75 text-start">
                  <input required type="password" id="repeat-password" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block mb-4">
                Change password
              </button>

            </form>
  `,
};

export default ResetPasswordForm;
