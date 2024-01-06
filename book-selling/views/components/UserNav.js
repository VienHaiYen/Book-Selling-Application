import { Avatar } from "./Avatar.js";
import state from "../stores/app-state.js";
const UserNav = {
  props: {
    source: String, // required
    size: String, // optional
    avatarImg: String,
  },
  components: {
    Avatar,
  },
  data() {
    return { state };
  },
  methods: {
    navigation(screen) {
      this.state.view = screen;
    },
    logOut() {
      axios
        .post("/logout")
        .then((res) => {
          state.user = undefined;
          navigation("Home");
          alert("Log out successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {},
  template: `

  
<div class="dropdown">
 
  <button class="btn btn-sm  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    <Avatar  :source="avatarImg" size="40px" />
  </button>
  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
    <li><button  class="dropdown-item" @click="this.navigation('Setting')">My Account</button></li>
    <li><button class="dropdown-item" @click="this.navigation('OrderHistory')">My Purchase</button></li>
    <li><div class="dropdown-item d-flex gap-3 align-items-center">Log out <button class="btn-sm btn-danger" @click="logOut" ><i class="fas fa-sign-out-alt"></i></button></div></li>
  </ul>
</div>


  
    `,
};

export { UserNav };
