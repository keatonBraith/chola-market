UPDATE cart 
SET 
product_id = ${product_id},
order_total = ${order_total}
WHERE customer_id = ${customer_id}
RETURNING *;