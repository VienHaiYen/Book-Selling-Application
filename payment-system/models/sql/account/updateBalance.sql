UPDATE Payment_Accounts 
SET balance = balance + $2
WHERE id = $1
RETURNING *;