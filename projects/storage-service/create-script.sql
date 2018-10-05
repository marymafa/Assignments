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
CREATE TABLE IF NOT EXISTS block(
id serial  PRIMARY KEY,
name VARCHAR(100),
location_id INT REFERENCES location(id) NOT NULL
);
CREATE TABLE IF NOT EXISTS unit_types(
id serial  PRIMARY KEY,
name VARCHAR(100),
length INT NOT NULL,
height INT NOT NULL  ,
width INT NOT NULL
);
CREATE TABLE IF NOT EXISTS unit(
id serial  PRIMARY KEY,
name VARCHAR(100),
block_id INT REFERENCES block(id) NOT NULL,
unit_type_id INT REFERENCES unit_types(id) NOT NULL
);

INSERT INTO 
business(name,contact_name,contact_number,contact_email)
VALUES
('gwfm','mary',0616118909,'mafay@gmail.com');
INSERT INTO 
location(address,business_id)
VALUES
('riverside',1),
('diepsloot',1);
INSERT INTO 
block(name,location_id)
VALUES
('block-3',3);
INSERT INTO 
unit(name,block_id,unit_type_id)
VALUES
('room-9',4,4);
INSERT INTO 
unit_types(name,length,height,width )
VALUES
('garage',10,10,6);

SELECT * FROM block;
SELECT * FROM business
INNER JOIN location
ON business.id=location.business_id
INNER JOIN block
ON location.id=block.location_id
INNER JOIN unit
ON block.id=unit.block_id
INNER JOIN unit_types
ON unit.unit_type_id=unit_types.id;
SELECT * FROM  location
INNER JOIN business
ON business.id=location.business_id
WHERE business.id=1;
SELECT * FROM unit
INNER JOIN unit_types
ON unit_types.id=unit.unit_type_id
WHERE unit_types.name='garage';
SELECT * FROM unit
INNER JOIN unit_types
ON unit_types.id=unit.unit_type_id
WHERE unit_types.width>3;