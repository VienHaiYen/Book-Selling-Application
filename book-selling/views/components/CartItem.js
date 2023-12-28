import state from "../stores/app-state.js";
const CartItem = {
  props: {
    item: Object,
  },
  data() {
    return {
      data: Object,
      state,
    };
  },
  methods: {
    increaseQuantity(item_id) {
      const newQuantity = this.item.quantity + 1;
      if (newQuantity > 0) {
        $.ajax({
          url: "/myCart/quantity",
          type: "PUT",
          data: {
            item_id: item_id,
            new_quantity: newQuantity,
          },
          success: (data) => {
            if (data) {
              this.item.quantity = data.data;
            }
          },
          error: function (error) {
            console.error(error);
          },
        });
      } else {
        console.error("Quantity cannot be less than zero.");
      }
    },
    decreaseQuantity(item_id) {
      const newQuantity = this.item.quantity - 1;
      if (newQuantity > 0) {
        $.ajax({
          url: "/myCart/quantity",
          type: "PUT",
          data: {
            item_id: item_id,
            new_quantity: newQuantity,
          },
          success: (data) => {
            if (data) {
              this.item.quantity = data.data;
            }
          },
          error: function (error) {
            console.error(error);
          },
        });
      } else {
        console.error("Quantity cannot be less than zero.");
      }
    },
    removeItem(id) {
      $.ajax({
        url: `/myCart/item/${id}`,
        type: "DELETE",
        success: function (data) {
          if (data.data.data == true)
            state.inCart = state.inCart.filter(
              (item_in_cart) => item_in_cart.id !== id
            );
        },
        error: function (error) {
          console.error(error);
        },
      });
      state.inCart = state.inCart.filter(
        (item_in_cart) => item_in_cart.id !== id
      );
      state.inCartSelected = state.inCartSelected.filter(
        (selected_item) => parseInt(selected_item) !== id
      );
    },
    clickCheckBox({ target }) {
      const isSelected = target.checked;
      if (isSelected) {
        state.inCartSelected.push(target.value);
      } else {
        const itemId = target.id;
        state.inCartSelected = state.inCartSelected.filter(
          (selected_item) => selected_item !== itemId
        );
      }
    },
  },
  mounted() {},
  template: `
  <div class="shopping-cart-item">
    <input class="cart-checkbox" type="checkbox" :id="item.id" :name="item.title" :value="item.id" @change="clickCheckBox($event)">
 
    <div>
      <img class="cart-image" :src="item.thumbnail"/>
    </div>
 
    <div class="description">
      <span>{{item.title}}</span>
      <span><i class="fa-solid fa-dollar-sign"></i>{{item.unit_price}}</span>
    </div>
 
    <div class="quantity">
      <button class="adjust-btn plus-btn" type="button" name="button" @click="this.increaseQuantity(item.book_id)">
        <img class="cart-button-image" src="images/plus.svg" />
      </button>
      <input type="text" name="name" :value="item.quantity">
      <button class="adjust-btn minus-btn" type="button" name="button" @click="this.decreaseQuantity(item.book_id)">
        <img class="cart-button-image" src="images/minus.svg" />
      </button>
    </div>
 
    <div class="item-total-price"><i class="fa-solid fa-dollar-sign"></i>{{item.quantity*item.unit_price}}</div>
     <button class="cart-delete-btn" type="button" name="button"  @click="this.removeItem(item.id)">
        <img class="cart-button-image" src="images/remove-item.svg" />
      </button>
  </div>
  `,
};
export { CartItem };
