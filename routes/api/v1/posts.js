const express = require("express");

const passport = require("passport");

const router = express.Router();

const postApi = require("../../../controllers/api/v1/posts_api");

router.get("/", postApi.getAll);

router.delete(
  "/delete/:id",
  passport.authenticate('jwt', {session: false}),
  postApi.delete
);

module.exports = router;
