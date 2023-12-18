select *
from users
where email = $1
and deleted_at IS NULL;