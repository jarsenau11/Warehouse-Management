CREATE TABLE Warehouse (
  warehouse_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  capacity INTEGER NOT NULL,
  street VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(255) NOT NULL,
  zip INTEGER NOT NULL
);

CREATE TABLE Product_Type (
  product_type_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Product (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  product_type_id INTEGER REFERENCES Product_Type(product_type_id),
  description VARCHAR(255),
  price NUMERIC(10, 2) NOT NULL,
  size INTEGER NOT NULL
);

CREATE TABLE Item (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER REFERENCES Product(product_id),
  warehouse_id INTEGER REFERENCES Warehouse(warehouse_id)
);