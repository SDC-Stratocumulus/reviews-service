const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const router = require("./router.js");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

module.exports = app;
