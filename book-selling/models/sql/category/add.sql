INSERT INTO public."categories" (name)
VALUES ($1)
RETURNING *;
