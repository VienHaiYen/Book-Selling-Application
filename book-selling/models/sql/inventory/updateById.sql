update book_inventory
set available_quantity=$2,unit_price=$3
where book_id = $1;