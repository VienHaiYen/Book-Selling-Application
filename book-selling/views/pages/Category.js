import { Modal, ModalInput } from "../components/index.js";
const Category = {
  components: {
    Modal,
    ModalInput,
  },
  data() {
    return {
      categories: [],
      activeId: "",
      categoryName: "",
      isActiveCate: true,
    };
  },
  methods: {
    async getCategories() {
      await axios
        .get("/categories")
        .then((res) => {
          this.categories = res.data;
          console.log(this.categories);
        })
        .catch((err) => console.log(err));
    },
    async deleteCate() {
      await axios
        .delete(`/categories/${this.activeId}`)
        .then((res) => {
          console.log(res.data);
          alert("Delete this category success");
          this.getCategories();
        })
        .catch((err) => {
          alert("Delete this category failed");
          console.log(err);
        });
      $("#deleteCate").modal("hide");
      $(".modal-backdrop").hide();
      $("body").removeClass("modal-open");
      $("body").css("overflow", "auto");
    },
    async editCate(newString) {
      await axios
        .put(`/categories/${this.activeId}`, {
          name: newString,
        })
        .then((res) => {
          console.log(res.data);
          alert("edit success");
          this.getCategories();
        })
        .catch((err) => console.log(err));
    },
    async addCate(newString) {
      await axios
        .post(`/categories`, {
          name: newString,
        })
        .then((res) => {
          console.log(res.data);
          alert("add success");
          this.getCategories();
        })
        .catch((err) => console.log(err));
    },
    tmp() {
      console.log("tmp");
    },
  },
  mounted() {
    this.getCategories();
  },
  template: `
      <div class="w-100">
        <Modal id="deleteCate" title="Delete category" description="Do you want remove this category?" :callback="deleteCate"/>
        <ModalInput id="editCate" title="Edit category" description="Edit Category name" :categoryName="categoryName" @callback="editCate"/>
        <ModalInput id="addCate" title="Add category" description="Add Category" @callback="addCate"/>
        <div class="table-wrapper m-5">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-6">
                <h2>Manage <b>Category</b></h2>
              </div>
              <div class="col-sm-6">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" v-model="isActiveCate" role="switch" id="flexSwitchCheckDefault">
                  <label class="form-check-label" for="flexSwitchCheckDefault">Active Category</label>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCate"><span>Add New Category</span></button>
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-for="(cate, index) in categories" :key="index" >
              <tr v-if="isActiveCate==cate.status">
                <td>{{cate.name}}</td>
                <td >
                  <button v-if="cate.status==true" type="button" class="btn m-1" @click="activeId=cate.id; categoryName=cate.name" data-bs-toggle="modal" data-bs-target="#editCate"><i class="fa-regular fa-pen-to-square"></i></button>
                  <button v-if="cate.status==true" type="button" class="btn m-1" @click="activeId=cate.id" data-bs-toggle="modal" data-bs-target="#deleteCate"><i class="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

  `,
};

export { Category };
