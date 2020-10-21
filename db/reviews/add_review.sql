INSERT INTO ratings
(title, rating, review, product_id, customer_id)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;