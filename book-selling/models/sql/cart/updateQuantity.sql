WITH updated_cart AS (
  UPDATE cart_item ci
  SET quantity = LEAST($3, bi.available_quantity)
  FROM book_inventory bi
  WHERE ci.item_id = bi.book_id
    AND ci.cart_id = $1
    AND ci.item_id = $2
  RETURNING ci.quantity AS new_quantity
)
SELECT new_quantity
FROM updated_cart;
