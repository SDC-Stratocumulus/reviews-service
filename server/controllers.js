module.exports = {
  // app.get('/:id', (req, res, next) => {
  //   db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, res) => {
  //     if (err) {
  //       return next(err)
  //     }
  //     res.send(res.rows[0])
  //   })
  // })
  // ... many other routes in this file

  getReviews: (req, res) => {},

  getMeta: (req, res) => {},

  addReview: (req, res) => {},

  markHelpful: (req, res) => {},

  reportReview: (req, res) => {},
};
