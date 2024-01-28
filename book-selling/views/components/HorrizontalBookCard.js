const HorrizontalBookCard = {
  data() {
    return {};
  },
  props: {
    books: Array,
  },
  methods: {
    addHours(date, hours) {
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);

      return date;
    },
    formatDate(input_date) {
      let date = new Date(input_date);
      date = this.addHours(date, 7);

      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      };

      const formattedDate = date.toLocaleString("en-US", options);
      return formattedDate;
    },
  },
  mounted() {},
  template: `
                <div class="" style="">
                  <div v-for="(book,index) in books" :book="book" :key="index" class="row g-0 mb-3 bg-white">
                    <div class="col-lg-3 col-md-4" style="max-height:240px; overflow: hidden">
                      <img
                        :src="book.thumbnail"
                        alt="Trendy Pants and Shoes"
                        class="img-fluid rounded-start  w-100"
                      />
                    </div>
                    <div class="col-lg-9 col-md-8">
                      <div   class="card-body d-flex flex-column justify-content-between h-100">
                        <div>
                          <h3 class="card-title">{{book.title}}</h3>
                          <p class="card-text mt-auto">
                            {{book.description}}
                          </p>
                        </div>
                        <h3 class="text fs-5 fw-light"><i class="fa-solid fa-dollar-sign"/>{{book.price}}</h3>
                        <p class="card-text">
                          <small class="text-muted">Bought at {{formatDate(book.bought_at)}}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                `,
};

export { HorrizontalBookCard };
