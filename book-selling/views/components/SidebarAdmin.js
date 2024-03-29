import state from "../stores/app-state.js";
import { Avatar } from "../components/Avatar.js";

const SidebarAdmin = {
  props: {
    avatarImg: String,
  },
  components: {
    Avatar,
  },
  data() {
    return {
      state,
    };
  },
  methods: {
    navigation(screen) {
      state.view = screen;
    },
    logOut() {
      axios
        .post("/logout")
        .then((res) => {
          state.user = undefined;
          localStorage.removeItem("user");
          state.view = "SignIn";
          // console.log(state);
          state.viewStack = [];
          alert("Log out successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {},
  template: `
  
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 py-2 px-0 bg-dark">
    <div class="d-flex justify-content-center my-2" >
      <div  style="width:120px; height:120px">
        <Avatar :source="state.user.avatar?state.user.avatar:state.defaultAvatar" @click="this.navigation('setting')" />
      </div>
    </div>
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
                <a @click="this.navigation('Home')" href="#" class="nav-link align-middle px-0">
                    <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Book list</span>
                </a>
            </li>
            <li>
                <a @click="this.navigation('AdminReport')" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Report</span> </a>
            </li>
            <li>
                <a @click="this.navigation('Setting')" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">My account</span> </a>
            </li>
            <li>
                <a @click="this.navigation('Category')" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Book Category</span> </a>
            </li>
            <li>
                <a @click="this.navigation('User')" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">User List</span> </a>
            </li>
            <li>
                <a @click="this.navigation('TransferHistory')" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Transaction History</span> </a>
            </li>
            <button class="btn btn-danger" style="margin-left:20px" @click="logOut" ><i class="fas fa-sign-out-alt"></i></button>
        </ul>
        <hr>
    </div>
   </div>
  `,
};

export { SidebarAdmin };
