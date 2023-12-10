const Register = {
  data() {
    return {};
  },
  methods: {},

  mounted() { },

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
            <h2 class="fw-bold mb-5">REGISTER</h2>
            <form>
              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="name">User name</label>
                <div class="w-75 text-start">
                  <input required type="text" id="name" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="birthday">Birthday</label>
                <div class="w-75 text-start">
                  <input required type="date" id="birthday" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex ">
                <label class="form-label text-start w-25" for="gender">Gender</label>
                <div class="w-25 text-start border border-secondary">
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="email">User email</label>
                <div class="w-75 text-start">
                  <input required type="mail" id="email" class="form-control border border-secondary w-75" />
                  </div>
              </div>

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
                REGISTER
              </button>

              <p>Already had an account? <a href="#!" class="link-info">Sign In here</a></p>

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

export { Register };
