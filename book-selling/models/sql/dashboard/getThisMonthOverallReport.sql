SELECT
  COUNT(DISTINCT o.id) AS total_orders,
  COUNT(DISTINCT o.user_id) AS total_clients,
  SUM(oi.quantity) AS total_sales,
  SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM
  order_item AS oi
JOIN
  orders AS o ON oi.order_id = o.id
WHERE
  EXTRACT(MONTH FROM o.created_at) = EXTRACT(MONTH FROM CURRENT_DATE);
