select t.*, count(t.*) over() as total_count
from purchase_orders po
join transactions t on po.id = t.id
where po.shop_account_id = $1
order by transaction_date desc
limit $2
offset $3;