import { Pagination } from "./index.js";

const UserList = {
  props: {},
  components: {
    Pagination,
  },
  data() {
    return {
      userList: [],
      meta: {},
      perpage: 5,
    };
  },
  methods: {
    async getUserList(page = 1) {
      console.log("/users/?page=" + page + "&pageSize=" + this.perpage);
      await axios
        .get("/users/?page=" + page + "&pageSize=" + this.perpage)
        .then((res) => {
          this.userList = res.data.data;
          this.meta = res.data.meta;
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.getUserList();
  },
  // <button class="btn btn-outline-primary mr-2"><i class="fas fa-edit"></i> Chỉnh sửa</button>
  template: `
    <div class="mx-2">
      <div class="d-flex justify-content-between">
        <h2>User list</h2>
        <div class="d-flex ">
          <label class="form-label">Perpage: </label>
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user,index) in userList">
            <th scope="row">{{(meta.page-1)*perpage+index+1}}</th>
            <td>{{user.full_name}}</td>
            <td>{{user.email}}</td>
            <td>{{1}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :totalPages="Math.ceil(meta.total/perpage)" :total="meta.total" :currentPage="meta.page" @pagechanged="this.getUserList" />
  `,
};
export { UserList };
