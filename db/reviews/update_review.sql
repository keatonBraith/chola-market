UPDATE ratings
SET 
title = ${title},
rating = ${rating},
review = ${review}
WHERE product_id = ${product_id}
RETURNING *;