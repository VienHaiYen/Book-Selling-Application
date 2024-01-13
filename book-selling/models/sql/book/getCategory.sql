SELECT *
FROM categories
JOIN book_category ON categories.id = book_category.category_id
WHERE book_category.book_id = $1
