SELECT books.*, COUNT(*) OVER(), book_inventory.available_quantity, book_inventory.unit_price
FROM public."books"
LEFT JOIN book_inventory ON id = book_inventory.book_id
ORDER BY $3^ $4^ NULLS LAST
LIMIT $1 OFFSET $2