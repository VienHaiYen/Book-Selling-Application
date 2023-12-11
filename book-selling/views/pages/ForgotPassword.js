import {
  InputMailForm,
  OTPForm,
  ResetPasswordForm,
} from "../components/index.js";

const ForgotPassword = {
  components: { InputMailForm, ResetPasswordForm, OTPForm },
  data() {
    return {};
  },
  methods: {},

  mounted() {},

  template: `
    <section class="text-center text-lg-start">

      <div class="container py-4">
        <div class="row g-0 align-items-center justify-content-center">
            <div class="card cascading-right" style="
                background: #A19D9DBD;
                max-width: 600px;
                ">
              <div class="card-body p-5 shadow-5 text-center">
                <h2 class="fw-bold mb-5">FORGET PASSWORD</h2>
                <form>
                  <component is="OTPForm"></component>
                </form>
              </div>
            </div>

        </div>
      </div>
    </section>
  `,
};

export { ForgotPassword };
