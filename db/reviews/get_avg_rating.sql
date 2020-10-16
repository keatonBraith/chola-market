SELECT AVG(rating)
FROM reviews r 
FULL OUTER JOIN products p ON p.product_id = r.product_id
WHERE p.product_id = $1;