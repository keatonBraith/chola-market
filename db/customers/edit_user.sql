UPDATE customers
SET
username = ${username},
email = ${email},
profile_pic = ${profile_pic},
first_name = ${first_name},
last_name = ${last_name}
WHERE customer_id = ${customer_id}
RETURNING *;