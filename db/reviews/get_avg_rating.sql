SELECT AVG(rating)
FROM ratings r 
FULL OUTER JOIN products p ON p.product_id = r.product_id
WHERE p.product_id = $1;