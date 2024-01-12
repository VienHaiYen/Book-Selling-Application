SELECT *, COUNT(*) OVER() as total
FROM orders
ORDER BY created_at DESC
LIMIT $1 OFFSET $2
