SELECT books.*,bi.available_quantity,bi.unit_price, COUNT(*) OVER()
FROM books ,book_inventory as bi
WHERE bi.book_id =books.id
ORDER BY id
LIMIT $1 OFFSET $2
