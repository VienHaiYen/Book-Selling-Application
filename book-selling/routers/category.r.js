const routers = require("express").Router();
const { categoryController } = require("../controllers");

routers.get("/", categoryController.getAll);

routers.get("/:categoryId", categoryController.getById);

routers.post("/", categoryController.add);

routers.put("/:categoryId", categoryController.update);

// DELETE /categories/{id}: Xóa một danh mục sách theo ID.

module.exports = routers;
