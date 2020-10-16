UPDATE products
SET 
title = ${title},
photo = ${photo},
price = ${price},
description = ${description},
ingredients = ${ingredients},
category_id = ${category_id}
WHERE product_id = ${product_id}
RETURNING *;