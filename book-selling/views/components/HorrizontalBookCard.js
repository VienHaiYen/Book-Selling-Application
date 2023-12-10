const HorrizontalBookCard = {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  template: `
                <div class="card mb-3" style="">
                  <div class="row g-0">
                    <div class="col-lg-3 col-md-4" style="max-height:240px; overflow: hidden">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVGu-67MoVDQnvYJitX8DWDmSzDaIXh1DAQ&usqp=CAU"
                        alt="Trendy Pants and Shoes"
                        class="img-fluid rounded-start  w-100"
                      />
                    </div>
                    <div class="col-lg-9 col-md-8">
                      <div class="card-body">
                        <h3 class="card-title">Harry Potter</h3>
                        <p class="card-text">
                          This is a wider card with supporting text below as a natural lead-in to
                          additional content. This content is a little bit longer.
                        </p>
                        <p class="card-text">
                          <small class="text-muted">Đã nhận hàng</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                `,
};

export { HorrizontalBookCard };
