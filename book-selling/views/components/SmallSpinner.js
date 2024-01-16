const SmallSpinner = {
  template: `
    <div class="d-flex justify-content-center align-items-center"
    style="min-height:10vh;
    background-color: #fff;
    opacity: 0.2;
    z-index: 1000;">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
};
export { SmallSpinner };
