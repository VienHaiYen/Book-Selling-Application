SELECT *, COUNT(*) OVER()
FROM public."books"
ORDER BY id
LIMIT $1 OFFSET $2