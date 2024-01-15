import { Pagination, Spinner } from "./index.js";
import state from "../stores/app-state.js";

const UserList = {
  props: {},
  components: {
    Pagination,
    Spinner,
  },
  data() {
    return {
      userList: Array,
      meta: {},
      perpage: 5,
    };
  },
  watch: {
    // Sử dụng watch để theo dõi sự thay đổi của state
    "state.userSearchInput": "handleGetUser",
  },
  methods: {
    async getUserByEmail(page = 1) {
      await $.ajax({
        url: `/users?email=${state.userSearchInput}&page=${page}&pageSize=${this.perpage}`,
        type: "GET",
        success: (res) => {
          console.log(res);
          this.userList = res.data;
          this.meta = res.meta;
        },
        error: function (error) {
          console.error(error);
        },
      });
    },
    async getUserList(page = 1) {
      this.userList = [];
      await axios
        .get("/users/?page=" + page + "&pageSize=" + this.perpage)
        .then((res) => {
          this.userList = res.data.data;
          this.meta = res.data.meta;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async deleteUser(id) {
      await axios
        .delete("/users/" + id)
        .then((res) => {
          this.getUserList();
          alert("Delete user successfully!");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleGetUser() {
      console.log(12, state.userSearchInput);
      if (state.userSearchInput.length > 0) {
        this.getUserByEmail();
      } else {
        this.getUserList();
      }
    },
  },
  mounted() {
    this.$watch(() => state.userSearchInput, this.handleGetUser);

    this.getUserList();
  },
  template: `
    <!--<Spinner v-if="!userList.length" /> -->
    <div class="mx-2">
      <div class="d-flex justify-content-between">
        <h2>User list</h2>
        <div class="d-flex ">
          <div class="d-flex align-items-center"><span>Perpage: </span></div>
          <select v-model="perpage" @change="getUserList(1)" class="form-select" aria-label="Default select example">
            <option value="2">2</option>
            <option selected value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <table class="table table-success table-striped-columns">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Items Bought</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in userList">
            <th scope="row">{{(meta.page-1)*perpage+index+1}}</th>
            <td>{{user.full_name}}</td>
            <td>{{user.email}}</td>
            <td>{{1}}</td>
            <td>
              <button @click="deleteUser(user.id)" class="btn btn-danger"><i class="fas fa-trash"></i> Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination v-if="meta.total" :totalPages="Math.ceil(meta.total/perpage)" :total="meta.total" :currentPage="meta.page" @pagechanged="this.getUserList" />
  `,
};
export { UserList };
