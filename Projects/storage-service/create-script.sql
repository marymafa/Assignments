CREATE TABLE IF NOT EXISTS business(
id serial PRIMARY KEY,
name VARCHAR(100),
contact_name VARCHAR(100),
contact_number VARCHAR(100),
contact_email VARCHAR(100)
);
CREATE TABLE IF NOT EXISTS location(
id serial  PRIMARY KEY,
address VARCHAR(100),
business_id INT REFERENCES business(id) NOT NULL
);
CREATE TABLE IF NOT EXISTS block (
id serial  PRIMARY KEY,
name VARCHAR(100),
location_id INT REFERENCES location(id) NOT NULL
);
CREATE TABLE IF NOT EXISTS unit(
id serial  PRIMARY KEY,
name VARCHAR(100),
block_id INT REFERENCES block(id) NOT NULL,
unit_type_id INT REFERENCES unit_types(id) NOT NULL
);
CREATE TABLE IF NOT EXISTS unit_types(
id serial  PRIMARY KEY,
name VARCHAR(100),
length INT NOT NULL,
height INT NOT NULL  ,
width INT NOT NULL
);

