const BookItem = {
  data() {
    return {
      data: Object,
    };
  },
  methods: {},
  mounted() {},
  template: `
    <div class="col-md-3">
      <div class="card" style="minWidth: 12rem;maxWidth:18rem">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSojjE3PUvb0U1FiEIAgaynAzymIMDkP45W6otMFU6mdw&s" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Book</h5>
              <h6 class="card-subtitle mb-2 text-muted">100.000d</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button class="btn btn-outline-primary mr-2 mb-2"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
          <button  class="btn btn-outline-primary"> Mua ngay</button>
        </div>
      </div>
    </div>
  `,
};
export { BookItem };
