CREATE TABLE IF NOT EXISTS businesses (
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        contact_name VARCHAR(100) NOT NULL,
        contact_number VARCHAR(100) NOT NULL,
        contact_email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS locations (
        id serial PRIMARY KEY,
        address VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        businesses_id INT REFERENCES businesses (id) NOT NULL
);

CREATE TABLE IF NOT EXISTS blocks (
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        locations_id INT REFERENCES locations (id) NOT NULL
);

CREATE TABLE IF NOT EXISTS units_type (
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        length DECIMAL NOT NULL,
        height DECIMAL NOT NULL,
        width DECIMAL NOT NULL
);

CREATE TABLE IF NOT EXISTS units (
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        blocks_id INT REFERENCES blocks (id) NOT NULL,
     units_type_id INT REFERENCES units_type (id) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer (
        id serial PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        PASSWORD VARCHAR(100) NOT NULL
);

INSERT INTO businesses (name, contact_name, contact_number, contact_email)
    VALUES ('gwfm', 'mary', '0616118909', 'mafay@gmail.com');

INSERT INTO locations (address, country, businesses_id)
    VALUES ('riverside', 'South-Africa', 1);

INSERT INTO blocks (name, locations_id)
    VALUES ('blocks-3', 1);

INSERT INTO units (name, blocks_id, units_type_id)
    VALUES ('room-2', 1, 1);

INSERT INTO units_type (name, length, height, width)
    VALUES ('garage', 10, 10, 5);

INSERT INTO customer (username, email, PASSWORD)
    VALUES ('princesmary', 'princessmary@gmail.com', 'hdfuhfr');

SELECT
    *
FROM
    blocks;

SELECT
    *
FROM
    customer;

SELECT
    *
FROM
    businesses
    INNER JOIN locations ON businesses.id = locations.businesses_id
    INNER JOIN blocks ON locations.id = blocks.locations_id
    INNER JOIN units ON blocks.id = units.blocks_id
    INNER JOIN units_type ON units.units_type_id = units_type.id;

SELECT
    *
FROM
    units
    INNER JOIN units_type ON units_type.id = units.units_type_id
    WHERE
        units_type.name = 'garage';

SELECT
    *
FROM
    locations
    INNER JOIN businesses ON businesses.id = locations.businesses_id
    WHERE
        businesses.id = 1;

SELECT
    *
FROM
    units
    INNER JOIN units_type ON units_type.id = units.units_type_id
    WHERE
 units_type.width > 3;

