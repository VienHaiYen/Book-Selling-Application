WITH date_series AS (
  SELECT
    generate_series(
      CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::integer - 6,
      CURRENT_DATE - EXTRACT(DOW FROM CURRENT_DATE)::integer,
      '1 day'::interval
    )::DATE AS date
)
SELECT
  ds.date,
  COUNT(DISTINCT o.id) AS total_orders,
  COUNT(DISTINCT o.user_id) AS total_clients,
  COALESCE(SUM(oi.quantity), 0) AS total_sales,
  COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total_revenue
FROM
  date_series ds
LEFT JOIN
  orders o ON ds.date = DATE(o.created_at)
LEFT JOIN
  order_item oi ON o.id = oi.order_id
WHERE
  EXTRACT(YEAR FROM ds.date) = EXTRACT(YEAR FROM CURRENT_DATE)
  AND EXTRACT(WEEK FROM ds.date) = EXTRACT(WEEK FROM CURRENT_DATE) - 1
GROUP BY
  ds.date
ORDER BY
  ds.date;
