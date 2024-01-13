import state from "../stores/app-state.js";

const Footer = {
  data() {
    return {
      state,
    };
  },
  template: `
      <footer class="text-center text-white" style="background-color: #8E92A4">
        <!-- Grid container -->
        <div class="container">

          <hr class="my-3" />
          <!-- Section: Social -->
          <section class="text-center mb-3">
            <a href="" class="text-white me-4">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="" class="text-white me-4">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="" class="text-white me-4">
              <i class="fab fa-google"></i>
            </a>
            <a href="" class="text-white me-4">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="" class="text-white me-4">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="" class="text-white me-4">
              <i class="fab fa-github"></i>
            </a>
          </section>
          <!-- Section: Social -->
        </div>
        <!-- Grid container -->

        <!-- Copyright -->
        <div
            class="text-center p-3"
            style="background-color: rgba(0, 0, 0, 0.2)"
            >
          © 2023 Copyright:
        </div>
        <!-- Copyright -->
      </footer>
    `,
};

export { Footer };
