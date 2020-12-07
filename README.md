# Reviews service API

## About

The goal of this project was to build a scalable RESTful API service for the Reviews component of an e-commerce website. The service was optimized by leveraging database indexing and connection pooling.

## Tech Stack

- [PostgreSQL](https://www.postgresql.org/)
- [Node-PG](https://node-postgres.com/)
- [Artillery](https://artillery.io/)
- [Semaphore CI](https://semaphoreci.com/)

## ETL

- Inherited legacy dataset consisting of 40M records.
- Designed appropriate schemas for the data
- Leveraged Node-PG connection pools and TablePlus to load the data into the local development database.

## Testing

Used Artillery to stress test the API.

## Interface Instruction for Client Side Requests

## Routes

| HTTP METHOD | Endpoint                    | Returns                                                                                                                                               | Status |
| ----------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| GET         | /reviews/:product_id/list   | Returns a list of reviews for a particular product.                                                                                                   | 200    |
| GET         | /reviews/:product_id/meta   | Returns review metadata for a given product.                                                                                                          | 200    |
| POST        | /reviews/:product_id        | Adds a review for the given product.                                                                                                                  | 201    |
| PUT         | /reviews/helpful/:review_id | Updates a review to show it was found helpful.                                                                                                        | 204    |
| PUT         | /reviews/report/:review_id  | Updates a review to show it was reported. Note, this action does not delete the review, but the review will not be returned in the above GET request. | 204    |
