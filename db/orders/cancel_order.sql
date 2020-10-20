UPDATE orders
SET canceled = TRUE
WHERE order_id = $1;
