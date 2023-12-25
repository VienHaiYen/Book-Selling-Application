const { reactive } = Vue;

export default reactive({
  view: "MyCart",
  darkMode: false,
  bannerList: undefined,
  inCart: [],
  inCartSelected: [1, 2, 3],
});
