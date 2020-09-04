const supertest = require("supertest");
const mocha = require("mocha");
const app = require("./server/index.js");
const assert = require("assert");

const agent = supertest.agent(app);

describe("This will test status codes", () => {
  it("should return 200", function (done) {
    agent.get("/").expect(200, done);
  });

  it("should return 200", function (done) {
    agent.get("/reviews/1/list").expect(200, done);
  });

  it("should return 204", function (done) {
    agent.put("/reviews/helpful/1").expect(204, done);
  });

  it("should return 204", function (done) {
    agent.put("/reviews/report/1").expect(204, done);
  });

  it("should return 404", function (done) {
    agent.get("/no").expect(404, done);
  });
});

describe("This will test routes", () => {
  it("should return the review with id 2", function (done) {
    agent
      .get("/reviews/2/list")
      .set("Accept", "application/json")
      .expect(function (res) {
        assert.equal(res.body.product, 2);
        assert.equal(res.body.results[0].summary, "I am liking these glasses");
        assert.equal(res.body.results[0].recommend, true);
      })
      .expect(200, done);
  });
});
