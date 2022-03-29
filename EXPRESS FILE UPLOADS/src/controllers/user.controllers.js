const express = require("express");
const User = require("../models/user.models");
const uploads = require("../middleware/uploads");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
// array mean countable image will send
// any mean multi image can be send...
router.post("", uploads.single("profilePic"), async (req, res) => {
  try {
    // console.log("users")
    const user = await User.create({
      first_name: req.body.first_name,
      profilePic: req.file.path,
    });
    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// for profile  multifile................
router.post("/multiple", uploads.any("profilePic"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => {
      return file.path;
    });
    const user = await User.create({
      first_name: req.body.first_name,
      last_name:req.body.last_name,
      profilePic: filePaths,
    });
    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});


module.exports = router;
