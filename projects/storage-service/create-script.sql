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
business(id,name,contact_name,contact_number,contact_email)
VALUES
(4,'tcg','thabiso',0616118909,'mafay@gmail.com');
INSERT INTO 
location(id,address,business_id)
VALUES
(2,'riverside',2);
INSERT INTO 
block(id,name,location_id)
VALUES
(1,'block-3',2);
INSERT INTO 
unit(id ,name,block_id,unit_type_id)
VALUES
(2,'room-4',1,2);
INSERT INTO 
unit_types(id,name,length,height,width )
VALUES
(2,'garage',10,10,6);