SELECT *, COUNT(*) OVER()
FROM public."books"
WHERE title LIKE $1
LIMIT $2 OFFSET $3
