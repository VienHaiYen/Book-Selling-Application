update users
set 
    address = COALESCE($2, address),
    full_name = COALESCE($3, full_name),
    phone = COALESCE($4, phone),
    avatar = COALESCE($5, avatar)
where id = $1
returning *;