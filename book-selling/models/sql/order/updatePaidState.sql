UPDATE orders
  SET status = 'Paid',
    payment_method=$2,
    transaction_id = $3
  WHERE id = $1;