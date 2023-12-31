CREATE OR REPLACE FUNCTION addNewItemInCart(p_cart_id integer, p_item_id integer, p_quantity integer)
RETURNS INT AS $$
DECLARE
  new_item_id INT;
  item_available BOOLEAN;
BEGIN
  -- create new order
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM cart_item as ci
      WHERE 
        ci.cart_id = p_cart_id
        AND ci.item_id = p_item_id 
        AND p_quantity <> 0 
        AND ci.quantity + p_quantity <= (SELECT available_quantity FROM book_inventory WHERE book_id = p_item_id LIMIT 1)
    ) THEN
      -- Update quantity if the item already exists in the cart
      UPDATE cart_item
      SET quantity = quantity + p_quantity
      WHERE 
        cart_id = p_cart_id
        AND item_id = p_item_id
      RETURNING id INTO new_item_id;

      -- Return the updated item_id
      RETURN new_item_id;
    END IF;

    -- Insert a new item into the cart if it doesn't exist
    INSERT INTO cart_item (cart_id, item_id, quantity)
    VALUES (p_cart_id, p_item_id, p_quantity)
    RETURNING id INTO new_item_id;

    SELECT EXISTS (
      SELECT 1
      FROM book_inventory
      WHERE 
        book_inventory.book_id = p_item_id
        AND book_inventory.available_quantity > 0 
        AND book_inventory.available_quantity >= p_quantity
    ) INTO item_available;

    -- Commented out the exception block
    
    IF NOT item_available THEN
      -- If there is not enough available quantity, raise an exception
      RAISE EXCEPTION 'Not enough available quantity for item_id %', p_item_id;
      RETURN -1;
    END IF;
   
  EXCEPTION
    WHEN OTHERS THEN
    -- Return false in case of an exception
      RETURN -1;
  END;
  
  -- Return the new_item_id on success
  RETURN new_item_id;
END;
$$ LANGUAGE plpgsql;
