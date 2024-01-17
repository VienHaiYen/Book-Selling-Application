WITH inserted_author AS (
    INSERT INTO public."authors" (name)
    SELECT $1
    WHERE NOT EXISTS (
        SELECT 1 FROM public."authors"
        WHERE LOWER(name) = LOWER($1)
    )
    RETURNING *
)
SELECT * FROM inserted_author
UNION ALL
SELECT * FROM public."authors"
WHERE LOWER(name) = LOWER($1)
LIMIT 1;
