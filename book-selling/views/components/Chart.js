const MyChart = {
  props: {
    data: Array,
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    labels() {
      return this.data.map((item) => this.toDDMMYYYY(item.date));
    },
    saleItems() {
      return this.data.map((item) => Number(item.total_sales));
    },
    saleRevenue() {
      return this.data.map((item) => Number(item.total_revenue));
    },
    toDDMMYYYY(date) {
      return new Date(date).toLocaleDateString("en-GB");
    },
  },
  mounted() {
    let script = document.createElement("script");
    script.onload = () => {
      const ctx = this.$refs.canvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.labels(),
          datasets: [
            {
              label: "Selling items",
              data: this.saleItems(),
              backgroundColor: [
                "yellow",
                "aqua",
                "pink",
                "lightgreen",
                "lightblue",
                "gold",
                "lightcoral",
              ],
              borderColor: ["black"],
              borderWidth: 2,
              pointRadius: 5,
              yAxisID: "ySale",
            },
            {
              label: "Selling revenue",
              data: this.saleRevenue(),
              backgroundColor: "lightblue",
              borderColor: "green",
              borderWidth: 2,
              pointRadius: 5,
              yAxisID: "yRevenue",
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false, // Không giữ tỷ lệ khung hình

          scales: {
            ySale: {
              type: "linear",
              position: "left",
              scaleLabel: {
                display: true,
                labelString: "Selling items",
              },
            },

            yRevenue: {
              type: "linear",
              position: "right",
              scaleLabel: {
                display: true,
                labelString: "Selling revenue",
              },
            },
          },
        },
      });
    };
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    document.head.appendChild(script);
    console.log("Chart is mounted!");
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  template: `
    <div>
      <canvas ref="canvas" style="width: 800px; height: 400px"></canvas>
    </div>
  `,
};

export { MyChart };
