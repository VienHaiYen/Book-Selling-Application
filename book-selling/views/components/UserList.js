import { UserItem } from "./UserItem.js";

const UserList = {
  props: {},
  components: {
    UserItem,
  },
  template: `
    <div class="mx-2">
        <h2>Danh sách người dùng</h2>
        <div class="m-0 d-flex flex-wrap justify-content-start ">
          <UserItem v-for="(book,index) in 10" :key="index">
           <div v-if="!isInCart">
              <button class="btn btn-outline-primary mr-2 mb-2"><i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng</button>
              <button class="btn btn-outline-primary"> Mua ngay</button>
           </div>
           <div v-if="isAdmin" class=" mb-2 d-flex justify-content-between">
              <button class="btn btn-outline-primary mr-2"><i class="fas fa-edit"></i> Chỉnh sửa</button>
              <button class="btn btn-danger"> Xóa </button>
           </div>
          </UserItem>
        </div>
      </div>
  `,
};
export { UserList };
