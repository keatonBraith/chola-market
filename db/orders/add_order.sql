INSERT INTO orders
(customer_id, product_id, order_total)
VALUES
($1, $2, $3)
RETURNING *;