import state from "../stores/app-state.js";

const Footer = {
  data() {
    return {
      state,
    };
  },
  template: `
    <div id="footer"
        class="navbar rounded-3 mt-5 mb-1 ps-2 justify-content-center">
        <b>Copyright &#169; TEST</b>
    </div>
    `,
};

export { Footer };
