SELECT *, COUNT(*) OVER()
FROM public."orders"
ORDER BY id
LIMIT $1 OFFSET $2
