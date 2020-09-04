const pool = require("./pool.js");
//const format = require("pg-format");

module.exports = {
  readReviewsById: (id, callback) => {
    const queryStrReviews = `select id as review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
      (
        select array_to_json(coalesce(array_agg(photo), array[]::record[]))
        from
          (
            select p.id, p.url from "public"."photos" p inner join "public"."reviews" r on r.id = p.review_id where product_id = $1
          ) photo
        ) as photos
      from "public"."reviews" where product_id = $1`;
    pool.connect().then((client) => {
      return client
        .query(queryStrReviews, [id])
        .then((res) => {
          callback(null, res.rows);
          client.release();
        })
        .catch((err) => {
          callback(err, null);
          client.release();
        });
    });
  },

  //TODO
  getMetaDb: () => {},

  postReview: ({ id, rating, summary, body, recommend, name, email }) => {
    const queryStrAddReview = `insert into "public"."reviews"
    ("product_id", "rating", "date", "summary", "body", "recommend", "reviewer_name", "reviewer_email", "helpfulness")
    values (${id}, ${rating}, current_timestamp, '${summary}', '${body}', ${recommend}, '${name}', '${email}', 0)
    returning id;`;
    return pool.connect().then((client) => {
      return client
        .query(queryStrAddReview)
        .then((res) => {
          client.release();
          return res;
        })
        .catch((err) => {
          client.release();
          return err;
        });
    });
  },

  postPhoto: ({ photos, id }) => {
    const queryStrAddPhoto = `insert into "public"."photos" (review_id, url) values (${id}, unnest($1::text[]))`;
    return pool.connect().then((client) => {
      return client
        .query(queryStrAddPhoto, [photos])
        .then((res) => {
          return res;
          client.release();
        })
        .catch((err) => {
          return err;
          client.release();
        });
    });
  },

  postCharacteristics: ({ characteristics, id }) => {
    const queryStrAddCharacteristics = `insert into "public"."characteristics_reviews" (review_id, characteristics_id, value) values (${id}, select * from json_to_record(${characteristics}) as x(characteristics_id text, value int))`;
    return pool.connect().then((client) => {
      return client
        .query(queryStrAddCharacteristics, [characteristics])
        .then((res) => {
          client.release();
          return res;
        })
        .catch((err) => {
          console.log("err: ", err);
          client.release();
          return err;
        });
    });
  },

  markHelpfulDb: (id, callback) => {
    const queryStrHelpful = `update "public"."reviews"
        set "helpfulness" = "helpfulness" + 1
        where id = ${id};`;
    pool.connect().then((client) => {
      return client
        .query(queryStrHelpful)
        .then((res) => {
          callback(null, res);
          client.release();
        })
        .catch((err) => {
          callback(err, null);
          client.release();
        });
    });
  },

  reportDb: (id, callback) => {
    const queryStrReported = `update "public"."reviews"
        set "reported" = ${true}
        where id = ${id};`;
    pool.connect().then((client) => {
      return client
        .query(queryStrReported)
        .then((res) => {
          callback(null, res);
          client.release();
        })
        .catch((err) => {
          callback(err, null);
          client.release();
        });
    });
  },
};
