const {
  readReviewsById,
  getMetaDb,
  postReview,
  postPhoto,
  postCharacteristics,
  markHelpfulDb,
  reportDb,
} = require("../db/queries.js");

module.exports = {
  getReviewsById: (req, res) => {
    const id = req.params.product_id;
    const page = req.query.page || 1;
    const count = req.query.count || 5;
    const sort = req.query.sort || "newest";
    return readReviewsById(id, (err, data) => {
      if (err) {
        res.status(500);
        console.log("error getting reviews by id : ", err);
      } else {
        res.status(200);
        res.send({ product: id, page, count, results: data });
      }
    });
  },

  //TODO
  getMeta: (req, res) => {
    const id = req.params.product_id;
    return getMetaDb(id, (err, data) => {
      if (err) {
        res.status(500);
        console.log("error getting meta data : ", err);
      } else {
        res.status(200);
        res.send(data);
      }
    });
  },

  addReview: (req, res) => {
    const params = {
      id: req.params.product_id,
      rating: req.body.rating,
      summary: req.body.summary,
      body: req.body.body,
      recommend: req.body.recommend,
      name: req.body.name,
      email: req.body.email,
      photos: req.body.photos,
      characteristics: req.body.characteristics,
    };
    return postReview(params)
      .then((data) => {
        const id = data.rows[0].id;
        postPhoto({ photos: params.photos, id });
        postCharacteristics({ characteristics: params.characteristics, id });
      })
      .then(() => {
        console.log("review posted");
        res.sendStatus(201);
      })
      .catch((err) => {
        res.status(404);
        console.log("error posting a review: ", err);
      });
  },

  markHelpful: (req, res) => {
    const id = req.params.review_id;
    return markHelpfulDb(id, (err, data) => {
      if (err) {
        console.log("error marking a review as helpful : ", err);
        res.status(404);
      } else {
        res.sendStatus(204);
        console.log("marked as helpful");
      }
    });
  },

  reportReview: (req, res) => {
    const id = req.params.review_id;
    return reportDb(id, (err, data) => {
      if (err) {
        console.log("error reporting a review : ", err);
        res.status(404);
      } else {
        res.sendStatus(204);
        console.log("successfully reported");
      }
    });
  },
};
