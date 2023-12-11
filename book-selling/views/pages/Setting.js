import { HorrizontalBookCard } from "../components/index.js";
const Setting = {
  components: {
    HorrizontalBookCard,
  },
  data() {
    return {
      isShowingMyBook: false,
    };
  },
  methods: {
    handleStateShowingMyBook() {
      this.isShowingMyBook = !this.isShowingMyBook;
    },
  },
  mounted() {},
  template: `
    <section >
      <div class="container py-5">

        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4">
              <div class="card-body text-center">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                  class="rounded-circle img-fluid" style="width: 150px;">
                <h5 class="my-3">John Smith</h5>
                <p class="text-muted mb-4">Bay Area, San Francisco, CA</p>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div v-if="!isShowingMyBook" class="card mb-4">
              <div class="card-body">
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn ">Edit <i class="fa-regular fa-pen-to-square"></i></button>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Full Name</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">Johnatan Smith</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">example@example.com</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Phone</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">(097) 234-5678</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Address</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
              <div class="d-flex justify-content-between mb-3">
                <h3 class="pb-2 mb-0">My book</h3>
                <button type="button" class="btn btn-dark" @click="handleStateShowingMyBook">{{isShowingMyBook?"Back to my Profile":"See more"}} </button>
              </div>
              <div class="col">
                <HorrizontalBookCard />
              </div>
            </div>
        </div>
      </div>
    </section>
  `,
};

export { Setting };