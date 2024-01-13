import { ValidateModel } from "../utils/index.js";
import { HorrizontalBookCard } from "../components/index.js";
import state from "../../stores/app-state.js";
const EditProfile = {
  components: {
    HorrizontalBookCard,
  },
  data() {
    return {
      state,
      img_file: File,
      full_name: state.user.full_name,
      email: state.user.email,
      phone: state.user.phone ? state.user.phone.trim() : "",
      address: state.user.address,
    };
  },
  methods: {
    mountOnAvatar: (e) => {
      e.target.querySelector("img").classList.add("hover");
      e.target.querySelector(".icon").classList.remove("d-none");
    },
    mountOutAvatar: (e) => {
      e.target.querySelector("img").classList.remove("hover");
      e.target.querySelector(".icon").classList.add("d-none");
    },
    changeAvatar(e) {
      $("#fileInput").click();
    },
    async fetchUser() {
      await axios
        .get(`/users/${state.user.id}`)
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((err) => console.error(err));
    },
    async updateProfile(e) {
      e.preventDefault();
      let imgInfo = await this.uploadImg();
      console.log(imgInfo);
      // if (!imgInfo) {
      //   alert("Upload image failed");
      //   // return;
      //   imgInfo = "";

      // }
      // thực hiện trả về
      console.log(
        44,
        this.full_name,
        this.phone,
        this.address,
        imgInfo
          ? "https://drive.google.com/thumbnail?id=" + imgInfo.id
          : state.user.avatar
      );
      console.log(
        "avatar",
        imgInfo
          ? "https://drive.google.com/thumbnail?id=" + imgInfo.id
          : state.user.avatar
      );
      axios
        .put(`/users/${state.user.id}`, {
          full_name: this.full_name,
          phone: this.phone,
          address: this.address,
          avatar: imgInfo
            ? "https://drive.google.com/thumbnail?id=" + imgInfo.id
            : state.user.avatar,
        })
        .then(async (res) => {
          alert("Update profile successfully");

          state.user = await this.fetchUser();
          state.user = res.data;
          state.view = "Setting";
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async uploadImg() {
      const formElem = document.querySelector("form#form");
      if (!(fileInput.files && fileInput.files.length > 0)) {
        // alert("Please choose a file");
        return;
      } else {
        if (
          !ValidateModel.areAllStringsNotEmpty([
            this.title,
            this.language,
            this.publisher,
            this.page_count,
            this.description,
            this.published_year,
            this.author_name,
            this.category_id,
          ])
        ) {
          alert("Please fill in all fields");
          return;
        }
        console.log("image submitting");
        let data = await fetch("/upload", {
          method: "POST",
          body: new FormData(formElem),
        })
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .catch((error) => {
            console.error(error);
          });
        return data;
      }
    },
  },
  mounted() {
    var fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("change", function () {
      readURL(this);
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#blah").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    if (state.user.avatar) {
      $("#blah").attr("src", state.user.avatar);
    } else {
      $("#blah").attr("src", state.defaultAvatar);
    }
  },
  template: `
    <section >
      <div class="container py-5">

        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-body text-center position-relative">
                <div style="width:fit-content; margin:0 auto" @mouseenter="mountOnAvatar" @mouseleave="mountOutAvatar">
                  <img id="blah" alt="avatar"
                    class=" rounded-circle img-fluid avartar" style="width: 150px;height: 150px;">
                  <div @click="this.changeAvatar" class="position-absolute icon d-none" style="top:30%; left:50%; transform:translate(-50%, -50%)"><i class="fas fa-camera  fs-1"></i></div>
                </div>
                <form id="form">
                    <div class="custom-file-input">
                      <input id="fileInput" class="form-control invisible" accept=".jpg, .png, .jpeg" type="file" name="Files" required />
                    </div>
                </form>
                <h5 class="my-3">{{state.user.full_name}}</h5>
                <p class="text-muted mb-4" >{{state.user.address}}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
              <form class="card mb-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Full Name</p>
                    </div>
                    <div class="col-sm-9">
                      <input v-model="full_name" type="text" class="form-control mb-0" placeholder="Enter full name"/>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                      <input v-model="email" disabled type="text" class="form-control mb-0"/>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Phone</p>
                    </div>
                    <div class="col-sm-9">
                      <input v-model="phone" type="tel"  class="form-control mb-0" placeholder="Enter your phone number"/>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Address</p>
                    </div>
                    <div class="col-sm-9">
                      <input v-model="address" type="text" class="form-control mb-0" placeholder="Enter your address"/>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <button type="submit" class="btn mt-3 btn-secondary" @click="updateProfile">Done</button>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </section>
  `,
};

export { EditProfile };
