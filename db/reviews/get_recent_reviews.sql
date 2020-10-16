SELECT * FROM reviews r 
FULL OUTER JOIN products p ON p.product_id = r.product_id
WHERE review IS NOT NULL
ORDER BY r.review_id DESC;