// import state from "../stores/app-state.js";

const BookDetail = {
  props: {
    id: String,
  },
  components: {},
  data() {
    return {
      book: {},
      // state,
    };
  },
  methods: {
    async getBookDetail() {
      await axios
        .get("/books/" + this.id)
        .then((res) => {
          this.book = res.data;
          console.log(this.book);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.getBookDetail();
  },
  template: `
    <section >
      <div class="d-flex justify-content-center">
        <div class="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
            <div class="card border-0 shadow">
                <img v-if="book" :src="book.thumbnail" alt="...">
            </div>
        </div>
        <div class=" col-md-5 col-lg-8">
            <div class="ps-lg-1-6 ps-xl-5">
                <div class="mb-2 wow fadeIn">
                    <div class="text-start wow fadeIn">
                        <h2 v-if="book"  class="h1 mb-0 text-primary">{{book.title}} <span>({{book.published_year}})</span></h2>
                        <h4 v-if="book"  class="my-2 mb-0 ">{{book.publisher}}</h4>
                    </div>
                    <p v-if="book" >{{book.description}}</p>
                </div>
                <div class="text-start wow fadeIn">
                    <h2 class="mb-2">100.000d</h2>
                </div>
                <div class="d-flex">
                  <button class="btn btn-outline-primary"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
                  <button class="btn btn-outline-primary mx-2"> Mua ngay</button>
                </div>
              </div>
          </div>
      </div>
    </section>
  `,
};

export { BookDetail };
