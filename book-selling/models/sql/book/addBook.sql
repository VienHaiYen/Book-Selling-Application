INSERT INTO public."books" (id, title, language, description, thumbnail, publisher, published_year, page_count, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, now(), now())
RETURNING *;
