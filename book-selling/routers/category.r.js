const routers = require("express").Router();
const { categoryController } = require("../controllers");

routers.get("/categories", categoryController.getAll);

routers.get("/categories/:categoryId", categoryController.getById);

// routers.post("/categories", categoryController.add);
//
// routers.put("/categories/:categoryId", categoryController.update);

// DELETE /categories/{id}: Xóa một danh mục sách theo ID.

module.exports = routers;
