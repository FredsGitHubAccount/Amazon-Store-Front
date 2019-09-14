DROP DATABASE IF EXISTS amazon_db;

CREATE DATABASE amazon_db;

USE amazon_db;

CREATE TABLE products (
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (item_id)

);

INSERT INTO PRODUCTS (product_name,department_name,price,stock_quantity)
VALUES ("WoW Game Card","Gaming",14.95,100),("Sennheiser Headphones","Gaming", 95, 80),("Steam Index","Gaming", 800, 15);

INSERT INTO PRODUCTS (product_name,department_name,price,stock_quantity)
VALUES ("Tennis Racquet","Sporting",199.99,10),("Wilson Tennis Balls","Sporting", 5, 25),("Wristbands","Sporting", 15, 70);

INSERT INTO PRODUCTS (product_name,department_name,price,stock_quantity)
VALUES ("iPad Pro","Electronics",1499.99,20),("ASUS Monitor 24HZ","Electronics", 250, 30),("Logitech Mouse","Electronics", 65, 70),("CM Storm Keyboard","Electronics",55,100);

SELECT * FROM products;
