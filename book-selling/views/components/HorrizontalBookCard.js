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
                      <div class="card-body d-flex flex-column justify-content-between h-100">
                        <div>
                          <h3 class="card-title">Harry Potter</h3>
                          <p class="card-text mt-auto">
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                          </p>
                        </div>
                        <h3><small class="text fs-5 fw-light text-decoration-line-through">$120</small>$100</h3>
                        <p class="card-text">
                          <small class="text-muted">Đã mua vào lúc 12:00 11 Dec 2023</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                `,
};

export { HorrizontalBookCard };
