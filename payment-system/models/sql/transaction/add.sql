INSERT INTO transactions (payment_account_id, amount, transaction_type, description)
VALUES ($1, $2, $3, $4)
RETURNING *