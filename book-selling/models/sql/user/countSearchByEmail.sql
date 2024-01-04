select count(*)
from users
where email ILIKE '%' || $1 || '%'
and deleted_at is null;