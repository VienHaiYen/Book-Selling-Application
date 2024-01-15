UPDATE public."book_category"
SET category_id = $2
WHERE book_id = $1
RETURNING *;
