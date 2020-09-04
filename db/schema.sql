CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id int,
  rating int,
  date timestamp,
  summary VARCHAR,
  body VARCHAR,
  recommend boolean,
  reported boolean,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness int DEFAULT 0);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  review_id int,
  url VARCHAR);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id int,
  name VARCHAR);

CREATE TABLE IF NOT EXISTS characteristics_reviews (
  id SERIAL PRIMARY KEY,
  characteristics_id int,
  review_id int,
  value int);

/*  Execute this file from the command line by typing:
   psql -d reviews -f schema.sql
 *  to create the database and the tables.*/
