const UserItem = {
  props: {
    user: {},
  },
  data() {
    return {
      fakeImg:
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
    };
  },
  template: `
    <div class="card mb-3 col-md-3" style="max-width: 540px;">
      <div class="row no-gutters">
        <div class="col-md-4 d-flex flex-column justify-content-center">
          <img :src="fakeImg" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">User name</h5>
            <p class="card-text">Bought 2 Item</p>
            <p class="card-text"><small class="text-muted">Last active 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
  `,
};
export { UserItem };
