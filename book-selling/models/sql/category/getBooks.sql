SELECT books.*
FROM books
JOIN book_category ON books.id = book_category.book_id
WHERE book_category.category_id = $1
