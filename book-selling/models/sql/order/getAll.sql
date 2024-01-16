SELECT *, COUNT(*) OVER() as total_count
FROM orders
ORDER BY created_at DESC
LIMIT $1 OFFSET $2
