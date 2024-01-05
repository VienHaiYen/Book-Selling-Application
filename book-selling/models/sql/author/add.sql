INSERT INTO public."authors" ( name )
SELECT $1
WHERE NOT EXISTS (
				SELECT 1
				FROM public."authors"
				WHERE LOWER(name) = LOWER($1)
)
RETURNING *;
