const express = require("express");
const Job = require("../models/Jobs");
const nodemailer = require("nodemailer");
const { auth } = require("../middleware/auth");
const {
  addNewJob,
  getJobs,
  sendMailToCandidates,
} = require("../controller/jobController");

const router = express.Router();

router.get("/get-jobs", auth, getJobs);

router.post("/add-new-job", auth, addNewJob);
router.post("/send-email", auth, sendMailToCandidates);

module.exports = router;
