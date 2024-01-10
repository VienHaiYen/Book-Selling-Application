import { ValidateModel } from "../utils/index.js";
import state from "../stores/app-state.js";
// import axios from "axios";
const AddBook = {
  data() {
    return {
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
    };
  },
  created() {
    axios
      .get("/categories")
      .then((res) => {
        this.categories = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    async uploadImg() {
      const formElem = document.querySelector("form#form");
      if (!(fileInput.files && fileInput.files.length > 0)) {
        alert("Please choose a file");
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
    async addBook(e) {
      e.preventDefault();
      let imgInfo = await this.uploadImg();
      console.log(imgInfo);
      if (!imgInfo) {
        alert("Upload image failed");
        return;
      }
      // await console.log({
      //   title: this.title,
      //   language: this.language,
      //   publisher: this.publisher,
      //   page_count: this.page_count,
      //   description: this.description,
      //   published_year: this.published_year,
      //   author_name: this.author_name,
      //   category_id: this.category_id,
      //   thumbnail: "https://drive.google.com/file/d/" + imgInfo.id,
      // });
      await axios
        .post("/books", {
          title: this.title,
          language: this.language,
          publisher: this.publisher,
          page_count: this.page_count,
          description: this.description,
          published_year: this.published_year,
          author_name: this.author_name,
          category_id: this.category_id,
          thumbnail: "https://drive.google.com/file/d/" + imgInfo.id,
        })
        .then((res) => {
          if (res.status == 200) {
            alert(res.data);
            state.view = "Home";
          } else {
            alert("Add book failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    var fileInput = document.getElementById("fileInput");
    var fileInputLabel = document.getElementById("fileInputLabel");

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
  },
  template: `
    <div>
      <h1>Add Book</h1>
      <form id="add-book-form" class="m-3">
        <div>
            <h2>Select Files to Upload To Google Drive</h2>
            <form id="form">
                <div class="custom-file-input">
                  <img id="blah" width="400px" src="#" />
                  <input id="fileInput" accept=".jpg, .png, .jpeg" type="file" name="Files" required />
                </div>
            </form>
        </div>

        <div class="form-row d-flex">
          <div class="form-group col-md-6 m-1">
            <label>Book Title</label>
            <input v-model="title" type="email" class="form-control"  />
          </div>
          <div class="form-group col-md-6 m-1">
            <label >Author</label>
            <input v-model="author_name" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-row d-flex">
          <div class="form-group col-md-6 m-1">
            <label>Publisher</label>
            <input v-model="publisher" type="text" class="form-control" />
          </div>
          <div class="form-group col-md-6 m-1">
            <label>Page number</label>
            <input v-model="page_count" type="number" class="form-control" />
          </div>
        </div>
        <div class="form-group">
            <label>Short description</label>
            <textarea v-model="description" type="text" class="form-control"></textarea>
          </div>
        <div class="form-row d-flex">
          <div class="form-group col-md-8 m-1">
            <label>Category</label>
            <select v-model="category_id" class="form-control" @change="e=>console.log(e.target.value)">
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
            <label>Year</label>
            <input v-model="published_year" type="number" class="form-control" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary" @click="this.addBook">Add book</button>
      </form>
    </div>
  `,
};
export { AddBook };