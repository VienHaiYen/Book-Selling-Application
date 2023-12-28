const { reactive } = Vue;

export default reactive({
  view: "Home",
  darkMode: false,
  bannerList: undefined,
  inCart: [],
  inCartSelected: [1, 2, 3],
});
