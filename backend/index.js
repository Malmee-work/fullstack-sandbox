const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = require("./router");

app.use(cors());

const PORT = 3001;
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
