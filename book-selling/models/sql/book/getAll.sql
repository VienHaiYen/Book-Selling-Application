SELECT books.*, COUNT(*) OVER(), book_inventory.available_quantity, book_inventory.unit_price
FROM public."books"
LEFT JOIN book_inventory ON id = book_inventory.book_id
ORDER BY id
LIMIT $1 OFFSET $2