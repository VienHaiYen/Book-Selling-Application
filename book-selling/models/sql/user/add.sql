insert into users (username, password_hash, role)
values ($1, $2, $3)
returning *;
