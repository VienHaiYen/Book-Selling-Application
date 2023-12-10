const OTPForm = {
  data() {
    return {};
  },
  methods: {},

  mounted() { },

  template: `
            <form>
              <div class="form-outline mb-4 d-flex flex-column align-items-center">
                  <input required type="text" id="otp" class="form-control border border-secondary w-50 text-center" />
                  <p class="text-muted">Check your email for OTP</p>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block mb-4">
                Submit OTP
              </button>

            </form>
  `,
};

export { OTPForm };
