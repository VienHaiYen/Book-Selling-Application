const MyChart = {
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    let script = document.createElement("script");
    script.onload = () => {
      const ctx = this.$refs.canvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "HTML",
            "CSS",
            "JAVASCRIPT",
            "CHART.JS",
            "JQUERY",
            "BOOTSTRP",
          ],
          datasets: [
            {
              label: "online tutorial subjects",
              data: [20, 40, 30, 35, 30, 20],
              backgroundColor: [
                "yellow",
                "aqua",
                "pink",
                "lightgreen",
                "lightblue",
                "gold",
              ],
              borderColor: ["black"],
              borderWidth: 2,
              pointRadius: 5,
            },
          ],
        },
        options: {
          responsive: false,
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
      <canvas ref="canvas"></canvas>
    </div>
  `,
};

export { MyChart };
