const router = require("express").Router();
const {
  getReviewsById,
  getMeta,
  addReview,
  markHelpful,
  reportReview,
} = require("./controllers.js");

// GET /reviews/:product_id/list - Status: 200 OK
router.get("/reviews/:product_id/list", getReviewsById);

// GET /reviews/:product_id/meta -  Status: 200 OK
router.get("/reviews/:product_id/meta", getMeta);

// POST /reviews/:product_id - Status: 201 CREATED
router.post("/reviews/:product_id", addReview);

// PUT /reviews/helpful/:review_id - Status: 204 NO CONTENT
router.put("/reviews/helpful/:review_id", markHelpful);

// PUT /reviews/report/:review_id - Status: 204 NO CONTENT
router.put("/reviews/report/:review_id", reportReview);

module.exports = router;
