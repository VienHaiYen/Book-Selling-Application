CREATE OR REPLACE FUNCTION makeNewOrder(user_id integer, item_list integer[])
RETURNS INT AS $$
DECLARE
  new_order_id INT;
  item RECORD;
  total_bill DECIMAL(10,2) = 0;
BEGIN
  -- create new order
  BEGIN
    INSERT INTO orders (user_id, status)
    VALUES (user_id, 'creating')
    RETURNING id INTO new_order_id;
 
    -- Iterate through each item in the item_list
    FOR item IN (
      SELECT
        cart_item.item_id,
        book_inventory.unit_price,
        cart_item.quantity,
        FALSE::BOOLEAN as item_available -- Initialize to FALSE, will be updated later
      FROM 
        cart_item
      JOIN 
        book_inventory ON cart_item.item_id = book_inventory.book_id
      WHERE 
        cart_item.id = ANY(item_list)
    )
    LOOP
	
       -- Check if there is enough available quantity in the item_inventory table
	  SELECT INTO item.item_available
		EXISTS (
		  SELECT 1
		  FROM book_inventory
		  WHERE 
			book_inventory.book_id = item.item_id
			AND book_inventory.available_quantity > 0 
			AND book_inventory.available_quantity >= item.quantity
		);

	  IF NOT item.item_available THEN
		-- If there is not enough available quantity, raise an exception
		RAISE EXCEPTION 'Not enough available quantity for item_id %', item.item_id;
		RETURN -1;
	  END IF;

      UPDATE book_inventory
      SET available_quantity = available_quantity - item.quantity
      WHERE book_inventory.book_id = item.item_id;

      -- Insert a new order into the order_item table
      INSERT INTO order_item (order_id, item_id, quantity, unit_price)
      VALUES (new_order_id, item.item_id, item.quantity, item.unit_price);

      -- update total_bill    
      total_bill = total_bill + (item.quantity * item.unit_price);
    END LOOP;
	if total_bill=0 then 
	RAISE EXCEPTION 'Error bill ';
		RETURN -1;
		  END IF;
    -- Remove the item from the cart_item table
    DELETE FROM cart_item
    WHERE cart_item.id = ANY(item_list); -- Update with actual item IDs

    -- update order information
    UPDATE orders
    SET status = 'created', total = total_bill
    WHERE id = new_order_id;

    -- Return true if successful
    RETURN new_order_id;
  EXCEPTION
    WHEN OTHERS THEN
    -- Return false in case of an exception
      RETURN -1;
  END;
END;
$$ LANGUAGE plpgsql;
