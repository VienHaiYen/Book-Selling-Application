const SignIn = {
  data() {
    return {};
  },
  methods: {},

  mounted() {},

  template: `
    <section class="text-center text-lg-start">


  <!-- Jumbotron -->
  <div class="container py-4">
    <div class="row g-0 align-items-center">
      <div class="col-lg-6 mb-5 mb-lg-0">
        <div class="card cascading-right" style="
            background: #e1e1e1bd;
            backdrop-filter: blur(30px);
            ">
          <div class="card-body p-5 shadow-5 text-center">
            <h2 class="fw-bold mb-5">SIGN IN</h2>
            <form>
              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="email">User email</label>
                <div class="w-75 text-start">
                  <input required type="password" id="email" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="email">Password</label>
                <div class="w-75 text-start">
                  <input required type="password" id="email" class="form-control border border-secondary w-75" />
                  <span class="small"><a  href="#!">Forgot password?</a></span>
                  </div>
              </div>

              <!-- Submit button -->
              <button type="submit" class="btn btn-primary btn-block mb-4">
                SIGN IN
              </button>

              <p>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-6 mb-5 mb-lg-0">
        <img src="https://images.unsplash.com/photo-1558901357-ca41e027e43a?q=80&w=1878&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="w-100 rounded-4 shadow-4"
          alt="" />
      </div>
    </div>
  </div>
  <!-- Jumbotron -->
</section>
<!-- Section: Design Block -->
  `,
};

export default SignIn;
