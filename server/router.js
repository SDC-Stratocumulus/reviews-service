const express = require("express");
const controllers = require("./controllers.js");
const router = express.Router();

// GET /reviews/:product_id/list - Status: 200 OK
router.get("/reviews/:product_id/list", controllers.getReviews);

// GET /reviews/:product_id/meta -  Status: 200 OK
router.get("/reviews/:product_id/meta", controllers.getMeta);

// POST /reviews/:product_id - Status: 201 CREATED
router.post("/reviews/:product_id", controllers.addReview);

// PUT /reviews/helpful/:review_id - Status: 204 NO CONTENT
router.put("/reviews/helpful/:review_id", controllers.markHelpful);

// PUT /reviews/report/:review_id - Status: 204 NO CONTENT
router.put("/reviews/helpful/:review_id", controllers.reportReview);

module.exports = router;
