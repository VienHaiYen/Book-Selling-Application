SELECT
   o.*,
    array_agg(
        jsonb_build_object(
            'item_id',oi.item_id,
            'quantity', oi.quantity,
            'title', b.title,
            'thumbnail', b.thumbnail,
			'unit_price',oi.unit_price
        )
    ) AS order_items
FROM
    orders AS o
JOIN
    order_item AS oi ON o.id = oi.order_id
JOIN
    books AS b ON oi.item_id = b.id

WHERE
    o.user_id = $1
GROUP BY
    o.id
ORDER BY o.created_at DESC;
	
