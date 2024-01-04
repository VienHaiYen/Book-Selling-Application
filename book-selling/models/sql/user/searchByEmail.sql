SELECT *
FROM users
WHERE email ILIKE '%' || $1 || '%'
AND deleted_at IS NULL
order by id
limit $2 offset $3;