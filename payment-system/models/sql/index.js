const { QueryFile } = require("pg-promise");
const { join } = require("path");
module.exports = {
    accountSQL: {
        add: sql("account/add.sql"),
        get: sql("account/get.sql"),
        updateBalance: sql("account/updateBalance.sql"),
        getTransactions: sql("account/getTransactions.sql"),
    },
    transactionSQL: {
        add: sql("transaction/add.sql"),
        addPurchaseOrder: sql("transaction/add_purchase_order.sql"),
    },
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
