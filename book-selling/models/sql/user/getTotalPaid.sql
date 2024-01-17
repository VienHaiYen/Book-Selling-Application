WITH method_data AS (
    SELECT $2 AS method 
)

SELECT
    sum(total) as total_paid
FROM
    orders
JOIN method_data ON true  
WHERE
    user_id = $1
    AND (
       (method_data.method = 'mepay' AND payment_method = 'mepay')
       OR (method_data.method = 'cash' AND payment_method = 'cash')
       OR method_data.method = 'all'
    );