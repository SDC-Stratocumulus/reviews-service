const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const bodyParser = require("body-parser");
//const router = require("./router.js");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use("/", router);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
