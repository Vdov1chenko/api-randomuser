DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  gender VARCHAR(10),
  title VARCHAR(10),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  street_number INTEGER,
  street_name VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(50),
  country VARCHAR(50),
  postcode VARCHAR(20),
  latitude FLOAT,
  longitude FLOAT
);