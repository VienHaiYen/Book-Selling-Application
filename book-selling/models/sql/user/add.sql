insert into users (email, password_hash, role, address, full_name, phone, google_id)
values ($1, $2, $3, $4, $5, $6, $7)
returning *;