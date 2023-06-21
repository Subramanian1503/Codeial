const express = require('express');

const router = express.Router();

router.use("/posts", require("../v1/posts"));

module.exports = router;