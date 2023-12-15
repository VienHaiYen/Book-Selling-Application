import { HorrizontalBookCard } from "../components/index.js";

const EditProfile = {
  components: {
    HorrizontalBookCard,
  },
  data() {
    return {};
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
  },
  mounted() {},
  template: `
    <section >
      <div class="container py-5">

        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-body text-center position-relative">
                <div style="width:fit-content; margin:0 auto" @mouseenter="mountOnAvatar" @mouseleave="mountOutAvatar">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                    class=" rounded-circle img-fluid avartar" style="width: 150px;">
                  <div class="position-absolute icon d-none" style="top:30%; left:50%; transform:translate(-50%, -50%)"><i class="fas fa-camera  fs-1"></i></div>
                </div>
                <h5 class="my-3">John Smith</h5>
                <p class="text-muted mb-4" >Bay Area, San Francisco, CA</p>
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
                      <input type="text" class="form-control mb-0" placeholder="John Smith"/>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Email</p>
                    </div>
                    <div class="col-sm-9">
                      <input type="text" class="form-control mb-0" placeholder="example@example.com"/>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Phone</p>
                    </div>
                    <div class="col-sm-9">
                      <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  class="form-control mb-0" placeholder="(097) 234-5678"/>
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-3">
                      <p class="mb-0">Address</p>
                    </div>
                    <div class="col-sm-9">
                      <input type="text" class="form-control mb-0" placeholder="Bay Area, San Francisco, CA"/>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <button type="submit" class="btn mt-3 btn-secondary">Done</button>
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
