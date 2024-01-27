import {
  HorrizontalBookCard,
  Avatar,
  Spinner,
  BackButton,
  DepositModal,
} from "../components/index.js";
import state from "../../stores/app-state.js";
const Setting = {
  components: {
    HorrizontalBookCard,
    Avatar,
    Spinner,
    BackButton,
    DepositModal,
  },
  data() {
    return {
      state,
      isShowingMyBook: false,
      onLoading: true,
      balance: 0,
      role: "",
    };
  },
  methods: {
    navigate: (screen) => {
      state.view = screen;
    },
    handleStateShowingMyBook() {
      this.isShowingMyBook = !this.isShowingMyBook;
    },

    editInfo() {
      state.view = "EditProfile";
    },
    async fetchMyBooks() {
      await $.ajax({
        url: `/books/myBooks`,
        type: "GET",
        success: function (data) {
          state.tempVal = data.data;
        },
        error: function (error) {
          console.error(error);
        },
      });
      this.onLoading = false;
    },
    async getBalance() {
      state.onLoading = true;
      if (this.role == "admin") {
        await $.ajax({
          url: `/balance`,
          type: "get",
          success: (data) => {
            this.balance = Number.parseFloat(data.balance);
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        await $.ajax({
          url: `/users/balance`,
          type: "get",
          success: (data) => {
            this.balance = Number.parseFloat(data.balance);
          },
          error: (error) => {
            console.error(error);
          },
        });
      }

      state.onLoading = false;
    },
    async handleDeposit(money) {
      await $.ajax({
        url: `/users/deposit`,
        type: "post",
        data: { amount: money },
        success: (data) => {
          this.balance = Number.parseFloat(data.balance);
          alert(`Deposit successfully! ${this.balance}`);
        },
        error: function (error) {
          console.error(error);
        },
      });
      $("#addBalance").modal("hide");
      $(".modal-backdrop").hide();
      $("body").removeClass("modal-open");
      $("body").css("overflow", "auto");
    },
  },
  async created() {
    this.role = JSON.parse(localStorage.getItem("user")).role;
    await this.getBalance();
  },
  async mounted() {
    await this.fetchMyBooks();
  },
  template: `
   <Spinner v-if="this.onLoading" />
   
   <section v-else >
    <DepositModal id="addBalance" title="Add Balance" description="Enter the amount you want to deposit"  :callback="handleDeposit"/>
      <BackButton />
      <div class="container py-2" v-if="state.user!=undefined">
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-4 p-4">
              <div style="width:fit-content; margin:0 auto">
                  <img alt="avatar"
                    :src="state.user.avatar?state.user.avatar:state.defaultAvatar"
                    class="my-2 rounded-circle img-fluid avartar" style="width: 150px;height: 150px;">
              </div>
            </div>
            <div class="card" v-if="state.user!=undefined">
              <div class="card-body">
                <h5 class="card-title">Budget</h5>
                <p class="card-text">Số tiền {{ balance.toLocaleString('en-US', {style: 'currency',currency: 'USD'}) }} </p>
                <a href="#" v-if="role=='client'" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#addBalance">Add Balance</a>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div v-if="!isShowingMyBook" class="card mb-4">
              <div class="card-body">
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn" @click="this.editInfo">Edit <i class="fa-regular fa-pen-to-square"></i></button>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Full Name</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{state.user.full_name}}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Email</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{state.user.email}}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Phone</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{state.user.phone}}</p>
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-sm-3">
                    <p class="mb-0">Address</p>
                  </div>
                  <div class="col-sm-9">
                    <p class="text-muted mb-0">{{state.user.address}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!(state.user == undefined ? false : state.user.role == 'admin')">
              <div class="d-flex justify-content-between mb-3">
                <h3 class="pb-2 mb-0">My book</h3>
                <button type="button" class="btn btn-dark" @click="navigate('OrderHistory')">{{isShowingMyBook?"Back to my Profile":"See more"}} </button>
              </div>
              <div class="col">
                <HorrizontalBookCard :books= "state.tempVal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
};

export { Setting };
