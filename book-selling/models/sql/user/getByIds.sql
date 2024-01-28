select *
from users
where id in ($1:csv);