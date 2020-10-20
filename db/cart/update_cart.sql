UPDATE cart 
SET 
product_id = ${product_id},
order_total = ${order_total}
WHERE cart_id = ${cart_id}
RETURNING *;