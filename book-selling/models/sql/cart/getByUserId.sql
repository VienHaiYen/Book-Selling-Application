SELECT
    c.*,
    array_agg(
        jsonb_build_object(
            'id', ci.id,
            'quantity', ci.quantity,
            'title', b.title,
            'thumbnail', b.thumbnail,
			'unit_price',bi.unit_price
        )
    ) AS cart_items
FROM
    carts AS c
JOIN
    cart_item AS ci ON c.id = ci.cart_id
JOIN
    books AS b ON ci.item_id = b.id
JOIN
    book_inventory AS bi ON ci.item_id = bi.book_id	
WHERE
    c.user_id = $1
GROUP BY
    c.id;