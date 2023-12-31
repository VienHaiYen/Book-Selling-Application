INSERT INTO public."books" (title, language, description, thumbnail, publisher, published_year, page_count)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;
