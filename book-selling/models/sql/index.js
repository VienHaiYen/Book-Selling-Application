const { QueryFile } = require("pg-promise");
const { join } = require("path");
module.exports = {
  userSQL: {
    add: sql("user/add.sql"),
    getByEmail: sql("user/getByEmail.sql"),
    searchByEmail: sql("user/searchByEmail.sql"),
    get: sql("user/get.sql"),
    count: sql("user/count.sql"),
    countSearchByEmail: sql("user/countSearchByEmail.sql"),
    getById: sql("user/getById.sql"),
    update: sql("user/update.sql"),
    delete: sql("user/delete.sql"),
  },
  authorSQL: {
    add: sql("author/add.sql"),
    getAll: sql("author/getAll.sql"),
    getBooks: sql("author/getBooks.sql"),
    getById: sql("author/getById.sql"),
    getByName: sql("author/getByName.sql"),
    update: sql("author/update.sql"),
  },
  bookSQL: {
    add: sql("book/add.sql"),
    addBookAuthor: sql("book/addBookAuthor.sql"),
    addBookCategory: sql("book/addBookCategory.sql"),
    getAll: sql("book/getAll.sql"),
    getAuthor: sql("book/getAuthor.sql"),
    getById: sql("book/getById.sql"),
    getByTitle: sql("book/getByTitle.sql"),
    getCategory: sql("book/getCategory.sql"),
    getMyBooks: sql("book/getMyBooks.sql"),
    updateBookCategory: sql("book/updateBookCategory.sql"),
    updateBookAuthor: sql("book/updateBookAuthor.sql"),
  },
  categorySQL: {
    add: sql("category/add.sql"),
    getAll: sql("category/getAll.sql"),
    getBooks: sql("category/getBooks.sql"),
    getById: sql("category/getById.sql"),
    getByName: sql("category/getByName.sql"),
  },
  cartSQL: {
    getByUserId: sql("cart/getByUserId.sql"),
    updateQuantity: sql("cart/updateQuantity.sql"),
    removeItemById: sql("cart/removeItemById.sql"),
    addItem: sql("cart/addItem.sql"),
  },
  inventorySQL: {
    getAvailableQuantity: sql("inventory/getAvailableQuantity.sql"),
    checkAvailableQuantity: sql("inventory/checkAvailableQuantity.sql"),
  },
  orderSQL: {
    makeNewOrder: sql("order/makeNewOrder.sql"),
    getOrderById: sql("order/getOrderById.sql"),
    getOrderByUserId: sql("order/getOrderByUserId.sql"),
    getOrders: sql("order/getAll.sql"),
  },
  dashboardSQL: {
    getTodayOverallReport: sql("dashboard/getTodayOverallReport.sql"),
    getThisWeekOverallReport: sql("dashboard/getThisWeekOverallReport.sql"),
    getThisMonthOverallReport: sql("dashboard/getThisMonthOverallReport.sql"),
    getThisYearOverallReport: sql("dashboard/getThisYearOverallReport.sql"),
    getThisWeekDetailReport: sql("dashboard/getThisWeekDetailReport.sql"),
  },
  // movieSQL: {
  //     add: sql("movie/add.sql"),
  //     add_Movie_Cast: sql("movie/add_movie_cast.sql"),
  //     get_rating_sorted: sql("movie/get_rating_sorted.sql"),
  //     get_limit_rating_sorted: sql("movie/get_limit_rating_sorted.sql"),
  //     get_limit_box_office_sorted: sql("movie/get_limit_box_office_sorted.sql"),
  //     search: sql("movie/search.sql"),
  //     count_search: sql("movie/count_search_result.sql"),
  //     get_by_id: sql("movie/get_by_id.sql"),
  //     get_list_ralated_to_cast: sql("movie/get_list_ralated_to_cast.sql")
  // },
};

function sql(file) {
  const fullPath = join(__dirname, file); // generating full path;

  const options = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // See also property 'params' for two-step template formatting
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
