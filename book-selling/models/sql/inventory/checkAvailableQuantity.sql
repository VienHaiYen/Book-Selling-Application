select exists (
    select * 
    from book_inventory as bi join cart_item as ci on bi.book_id=ci.item_id
    where ci.cart_id=$1 and ci.id= $2 and ci.quantity  between 1 and bi.available_quantity
    )