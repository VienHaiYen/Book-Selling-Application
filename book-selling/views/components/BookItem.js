const BookItem = {
  props: {
    movie: Object,
  },
  data() {
    return {
      data: Object,
    };
  },
  methods: {},
  mounted() {},
  template: `
    <div class="m-2 col" style="minWidth:14rem ; maxWidth:18rem">
      <div class="card">
        <img :src="movie.thumbnail" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{movie.title}}</h5>
              <h6 class="card-subtitle mb-2 text-muted">100.000d</h6>
          <p class="card-text bookcard-decription">{{movie.description}}</p>
          <button class="btn btn-outline-primary mr-2 mb-2"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
          <button class="btn btn-outline-primary"> Mua ngay</button>
        </div>
      </div>
    </div>
  `,
};
export { BookItem };
