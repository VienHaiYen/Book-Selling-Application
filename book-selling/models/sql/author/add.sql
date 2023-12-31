INSERT INTO public."authors" (name)
VALUES ($1)
RETURNING *;
