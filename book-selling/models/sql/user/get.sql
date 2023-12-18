select * 
from users
where deleted_at is null
order by id
limit $1 offset $2