update users
set deleted_at = now()
where id = $1
and deleted_at is null
returning *;