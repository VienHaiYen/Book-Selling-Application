const { reactive } = Vue;

export default reactive({
  view: "Home",
  darkMode: false,
  bannerList: undefined,
  inCart: [],
  inCartSelected: [],
  previousPage: "Home",
  bookId: 10,
});
