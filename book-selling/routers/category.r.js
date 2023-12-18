const routers = require("express").Router();
const { categoryController } = require("../controllers");

routers.get("/categories", categoryController.getAll)

// routers.get("/categories/:categoryId")

// POST /categories: Thêm danh mục sách mới. 
//
// PUT /categories/{id}: Cập nhật thông tin danh mục sách theo ID. 
//
// DELETE /categories/{id}: Xóa một danh mục sách theo ID.

module.exports = routers;
