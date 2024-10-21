const nodemailer = require("nodemailer");
const Jobs = require("../models/Jobs");
const { emailContentExporter } = require("../utils/mailTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const addNewJob = async (req, res) => {
  const {
    jobTittle,
    jobDescription,
    experienceLevel,
    candidates,
    endDate,
    location,
    type,
    salary,
    skills,
  } = req.body;

  console.log(req.body);

  if (
    !jobTittle ||
    !jobDescription ||
    !experienceLevel ||
    !candidates ||
    !endDate ||
    !location ||
    !type ||
    !salary ||
    !skills ||
    skills.length === 0
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create new job document with additional fields
    const newJob = new Jobs({
      jobTittle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
      location,
      type,
      salary,
      skills,
      postedBy: req.userId, // Assuming `req.userId` contains the ID of the logged-in user
    });

    // Save the new job to the database
    await newJob.save();

    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const sendMailToCandidates = async (req, res) => {
  const { jobId, emails } = req.body;

  try {
    const job = await Jobs.findById(jobId).populate({
      path: "postedBy",
      select: "companyName ",
      model: "User",
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const emailContent = emailContentExporter(job);

    const mailOptions = {
      from: process.env.EMAIL,
      to: emails.join(","),
      subject: `New Job Posting: ${job.jobTittle}`,
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getJobs = async (req, res) => {
  const companyId = req.userId;

  try {
    const jobs = await Jobs.find({ postedBy: companyId }).populate({
      path: "postedBy",
      select: "companyName ",
      model: "User",
    });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for this company." });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching jobs." });
  }
};

module.exports = { addNewJob, sendMailToCandidates, getJobs };
