import { ValidateModel } from "../utils/index.js";
import { BackButton } from "../components/index.js";

import state from "../stores/app-state.js";

const EditBook = {
  components: { BackButton },
  data() {
    return {
      book: {},
      author: {},
      category: {},
      categories: [],
      img_file: File,
      title: "",
      language: "",
      publisher: "",
      page_count: "",
      description: "",
      published_year: "",
      author_name: "",
      category_id: "",
      thumbnail: "",
      unit_price: "",
      quantity: "",
    };
  },
  created() {
    axios
      .get("/categories")
      .then((res) => {
        this.categories = res.data.filter((cate) => cate.status == true);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    async uploadImg() {
      const formElem = document.querySelector("form#form");
      if (!(fileInput.files && fileInput.files.length > 0)) {
        // alert("Please choose a file");
        return this.book.thumbnail;
      } else {
        if (
          !ValidateModel.areAllStringsNotEmpty([
            this.title,
            // this.language,
            // this.publisher,
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
        return "https://drive.google.com/thumbnail?id=" + data.id;
      }
    },
    cancel() {
      state.view = "Home";
    },
    async editBook() {
      let imgInfo = await this.uploadImg();
      // console.log(imgInfo);
      if (!imgInfo) {
        // alert("Upload image failed");
        // return;
      }

      await axios
        .put(`/books/${this.book.id}`, {
          title: this.title,
          language: this.language,
          publisher: this.publisher,
          page_count: this.page_count,
          description: this.description,
          published_year: this.published_year,
          // author_name: this.author_name,
          // category_id: this.category_id,
          thumbnail: imgInfo,
        })
        .then((res) => {
          if (res.status == 200) {
            // alert(res.data);
            // state.view = "Home";
          } else {
            alert("Add book failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editCategory() {
      await axios
        .put(`/books/category/${state.activeId}`, {
          categoryId: this.category_id,
        })
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            // state.view = "Home";
          } else {
            alert("Add book failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editAuthor() {
      await axios
        .put(`/books/author/${state.activeId}`, {
          authorName: this.author_name,
        })
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data);
            // state.view = "Home";
          } else {
            alert("Add book failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async editInventory() {
      console.log(this.quantity, this.unit_price, state.activeId);
      await axios
        .put(`/inventory`, {
          book_id: state.activeId,
          new_quantity: this.quantity,
          new_unit_price: this.unit_price,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            // console.log(12, res.data);
            alert("Edit book successfully");
          } else {
            alert("Add book failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async edit(e) {
      e.preventDefault();

      await this.editBook();
      await this.editCategory();
      await this.editAuthor();
      await this.editInventory();

      await this.getBookInfo();
      await this.getBookInventory();
    },
    async getBookInventory() {
      await axios
        .get("/inventory/availableQuantity/" + state.activeId)
        .then((res) => {
          console.log(res.data.data);
          this.unit_price = res.data.data.unit_price;
          this.quantity = res.data.data.available_quantity;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getBookInfo() {
      await axios
        .get("/books/detail/" + state.activeId)
        .then((res) => {
          // console.log(res.data.data);
          this.book = res.data.data.book;
          this.author = res.data.data.author;
          this.category = res.data.data.category;

          this.title = this.book.title;
          this.language = this.book.language;
          this.publisher = this.book.publisher;
          this.page_count = this.book.page_count;
          this.description = this.book.description;
          this.published_year = this.book.published_year;
          // TODO: đang gặp bug, vì chưa có get được author id
          this.author_name = this.author.name;
          this.category_id = this.category.category_id;
          this.thumbnail = this.book.thumbnail;
          $("#blah").attr("src", this.thumbnail);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // xử lí upload ảnh
    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $("#blah").attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    var fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", function () {
      readURL(this);
    });
    if (state.activeId) {
      localStorage.setItem("bookIdDetail", state.activeId);
    } else {
      state.activeId = localStorage.getItem("bookIdDetail");
    }
    // xử lí load thông tin sách
    this.getBookInfo();
    this.getBookInventory();
  },
  template: `
    <div class="m-5">
      <BackButton />
      <h1>Edit Book</h1>
      <form id="add-book-form" class="m-3">
        <form id="form">
            <div class="custom-file-input">
              <label for="fileInput" class="form-label">Thumnail(*)</label><br/>
              <img id="blah" width="400px" src="#" /><br/>
              <input id="fileInput" class="form-control" accept=".jpg, .png, .jpeg" type="file" name="Files" required />
            </div>
        </form>
        <div class="form-row d-flex">
          <div class="form-group col-md-6 m-1">
            <label>Book Title(*)</label>
            <input v-model="title" type="text" class="form-control"  />
          </div>
          <div class="form-group col-md-6 m-1">
            <label >Author(*)</label>
            <input v-model="author_name" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-row d-flex">
          <div class="form-group col-md-6 m-1">
            <label>Publisher</label>
            <input v-model="publisher" type="text" class="form-control" />
          </div>
          <div class="form-group col-md-6 m-1">
            <label>Page number(*)</label>
            <input v-model="page_count" type="number" class="form-control" />
          </div>
        </div>
        <div class="form-group">
            <label>Short description(*)</label>
            <textarea v-model="description" type="text" class="form-control"></textarea>
          </div>
        <div class="form-row d-flex">
          <div class="form-group col-md-8 m-1">
            <label>Category(*)</label>
            <select v-model="category_id" class="form-control" @change="">
              <option v-for="(option, index) in categories" :value="option.id">{{option.name}}</option>
            </select>
          </div>
          <div class="form-group col-md-4 m-1">
            <label>Languague</label>
            <input v-model="language" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-row d-flex">
          <div class="form-group col-md-8 m-1">
            <label>Year(*)</label>
            <input v-model="published_year" type="number" class="form-control" />
          </div>
        </div>
        <div class="form-row d-flex">
          <div class="form-group col-md-6 m-1">
            <label>Cost(*)</label>
            <div class="input-group mb-3">
              <span class="input-group-text">$</span>
              <input v-model="unit_price" type="number" class="form-control" />
            </div>
          </div>
          <div class="form-group col-md-6 m-1">
            <label>Quantity of stock(*)</label>
            <input v-model="quantity" type="number" class="form-control" />
          </div>
        </div>
        <button type="submit" class="btn m-2 btn-primary" @click="this.edit">Edit</button>
        <button type="submit" class="btn m-2 btn-outline-primary" @click="this.cancel">Cancel</button>
      </form>
    </div>
  `,
};
export { EditBook };
