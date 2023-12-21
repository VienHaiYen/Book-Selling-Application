// import state from "../stores/app-state.js";
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
      // state,
    };
  },
  methods: {
    navigation(screen) {
      this.$emit("changeView", screen);
    },
  },
  mounted() {},
  template: `
  
  <div class="col-auto col-md-3 col-xl-2 px-sm-2 py-2 px-0 bg-dark">
    <div class="d-flex justify-content-center" >
        <Avatar :source="avatarImg" size="100px" @click="this.navigation('setting')" />
    </div>
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li class="nav-item">
                <a href="#" class="nav-link align-middle px-0">
                    <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Report</span>
                </a>
            </li>
            <li>
                <a @click="this.navigation('AdminBooks')" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Book List</span> </a>
                <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                    <li class="w-100">
                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1 </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2 </a>
                    </li>
                </ul>
            </li>
            <li>
                <a @click="this.navigation('User')" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                    <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">User List</span> </a>
                <ul class="collapse show nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                    <li class="w-100">
                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 1 </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link px-0"> <span class="d-none d-sm-inline">Item</span> 2 </a>
                    </li>
                </ul>
            </li>
        </ul>
        <hr>
    </div>
   </div>
  `,
};

export { SidebarAdmin };
