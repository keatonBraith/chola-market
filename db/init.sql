CREATE TABLE customers(
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_pic TEXT,
    is_admin BOOLEAN
);

CREATE TABLE products(
    product_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    photo TEXT,
    price DECIMAL(10, 2),
    description TEXT,
    ingredients TEXT,
    review_id INT REFERENCES ratings(review_id),
    category_id INT REFERENCES categories(category_id)
);

CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    order_total DECIMAL(10, 2) NOT NULL,
    canceled BOOLEAN DEFAULT FALSE 
);

CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE ratings(
    review_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    customer_id INT REFERENCES customers(customer_id)
);

CREATE TABLE cart(
    cart_id SERIAL PRIMARY KEY,
    product_id REFERENCES products(product_id),
    customer_id REFERENCES customers(customer_id),
    order_total DECIMAL(10, 2) NOT NULL 
);