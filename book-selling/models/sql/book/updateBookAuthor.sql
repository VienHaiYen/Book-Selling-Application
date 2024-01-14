UPDATE public."book_author"
SET author_id = $2
WHERE book_id = $1
RETURNING *;
