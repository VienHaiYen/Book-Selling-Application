import { ValidateModel } from "../utils/index.js";
import state from "../stores/app-state.js";
const Register = {
  data() {
    return {
      full_name: "",
      address: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
      role: "client",
    };
  },

  methods: {
    register: async function (e) {
      e.preventDefault();
      if (
        !ValidateModel.areAllStringsNotEmpty([
          this.full_name,
          this.address,
          this.phone,
          this.email,
          this.password,
          this.repeatPassword,
        ])
      ) {
        alert("Please fill in all fields");
        return;
      }
      if (!ValidateModel.isValidateEmail(this.email)) {
        alert("Invalid Email ");
        return;
      }
      if (!ValidateModel.isMoreThanNChars(this.password)) {
        alert("Password must be at least 4 characters ");
        return;
      }
      if (this.password != this.repeatPassword) {
        alert("Password doesn't match");
        return;
      }
      axios
        .post("/signin", {
          full_name: this.full_name.trim(),
          address: this.address.trim(),
          phone: this.phone.trim(),
          email: this.email.trim(),
          password: this.password.trim(),
          role: "client",
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Register successfully");
            state.view = "SignIn";
          } else {
            alert("Wrong email or password");
          }
        })
        .catch((err) => {
          alert("Failed to register: Email already in use");
          console.error(err);
        });
    },
    navigator(screen) {
      state.view = screen;
    },
  },

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
            <h2 class="fw-bold mb-5">REGISTER</h2>
            <form>
              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="name">Full name</label>
                <div class="w-75 text-start">
                  <input required v-model="full_name" type="text" id="name" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="email">User email</label>
                <div class="w-75 text-start">
                  <input v-model="email" required type="mail" id="email" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="address">Address</label>
                <div class="w-75 text-start">
                  <input v-model="address" required type="text" id="address" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="phone">Phone number</label>
                <div class="w-75 text-start">
                  <input v-model="phone" required type="text" id="phone" class="form-control border border-secondary w-75" />
                  </div>
              </div>


              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="password">Password</label>
                <div class="w-75 text-start">
                  <input v-model="password" required type="password" id="password" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <div class="form-outline mb-4 d-flex">
                <label class="form-label text-start w-25" for="repeat-password">Repeat your password</label>
                <div class="w-75 text-start">
                  <input v-model="repeatPassword" required type="password" id="repeat-password" class="form-control border border-secondary w-75" />
                  </div>
              </div>

              <!-- Submit button -->
              <button type="submit" @click="this.register" class="btn btn-primary btn-block mb-4">
                REGISTER
              </button>

              <p>Already had an account? <a href="#!" @click="navigator('SignIn')" class="link-info">Sign In here</a></p>

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
