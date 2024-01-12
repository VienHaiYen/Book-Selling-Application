SELECT distinct (b.title),b.thumbnail,b.description,oi.unit_price as price,o.created_at as bought_at
FROM books AS b JOIN order_item AS oi ON oi.item_id = b.id  JOIN orders AS o   ON o.id = oi.order_id 
WHERE o.user_id = $1 
GROUP BY b.id ,o.created_at,oi.unit_price
ORDER BY o.created_at DESC
LIMIT 5 OFFSET 0;