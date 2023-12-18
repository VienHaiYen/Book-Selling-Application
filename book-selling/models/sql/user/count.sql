select count(*)
from users
where deleted_at is null;