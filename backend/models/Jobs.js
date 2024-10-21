const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTittle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  candidates: [{ type: String }],
  endDate: { type: Date, required: true },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: { type: String, required: true },
  type: { type: String, required: true },
  salary: { type: String, required: true },
  skills: [{ type: String, required: true }],
  posted: { type: Date, default: Date.now },
});

const Jobs = mongoose.model("Job", JobSchema);

module.exports = Jobs;
