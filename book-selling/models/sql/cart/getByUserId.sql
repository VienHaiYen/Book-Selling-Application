SELECT
    u.id,
    array_agg(
        jsonb_build_object(
            'id', ci.id,
            'item_id',ci.item_id,
            'quantity', ci.quantity,
            'title', b.title,
            'thumbnail', b.thumbnail,
			'unit_price',bi.unit_price
        )
    ) AS cart_items
FROM
    users AS u
JOIN
    cart_item AS ci ON u.id = ci.cart_id
JOIN
    books AS b ON ci.item_id = b.id
JOIN
    book_inventory AS bi ON ci.item_id = bi.book_id	
WHERE
    u.id = $1
GROUP BY
    u.id;