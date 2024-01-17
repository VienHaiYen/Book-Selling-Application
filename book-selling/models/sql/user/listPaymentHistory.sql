SELECT
  id as order_id,transaction_id,total,payment_method,status,created_at as paid_time, COUNT(*) OVER() as total_count
FROM
    orders
WHERE
    user_id = $1
ORDER BY created_at DESC
LIMIT $2 OFFSET $3;