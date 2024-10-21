import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createJobAPI, sendEmailAPI } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const CreateInterview = () => {
  const [formData, setFormData] = useState({
    jobTittle: "",
    jobDescription: "",
    experienceLevel: "",
    candidates: [],
    endDate: "",
    location: "",
    type: "",
    salary: "",
    skills: [],
  });

  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    setEmailInput(e.target.value);
  };

  const handleSkillChange = (e) => {
    setSkillInput(e.target.value);
  };

  const addEmail = (e) => {
    e.preventDefault();
    const emails = emailInput.split(",").map((email) => email.trim());

    const validEmails = emails.filter(
      (email) =>
        /\S+@\S+\.\S+/.test(email) && !formData.candidates.includes(email)
    );

    if (validEmails.length > 0) {
      setFormData((prev) => ({
        ...prev,
        candidates: [...prev.candidates, ...validEmails],
      }));
      setEmailInput("");
      toast.success(`${validEmails.length} emails added successfully!`);
    } else {
      toast.error("Please enter valid and unique email addresses.");
    }
  };

  const addSkill = (e) => {
    e.preventDefault();
    const skills = skillInput.split(",").map((skill) => skill.trim());

    const uniqueSkills = skills.filter(
      (skill) => skill && !formData.skills.includes(skill)
    );

    if (uniqueSkills.length > 0) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, ...uniqueSkills],
      }));
      setSkillInput("");
      toast.success(`${uniqueSkills.length} skills added successfully!`);
    } else {
      toast.error("Please enter valid and unique skills.");
    }
  };

  const removeEmail = (emailToRemove) => {
    setFormData((prev) => ({
      ...prev,
      candidates: prev.candidates.filter((email) => email !== emailToRemove),
    }));
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "jobTittle",
      "jobDescription",
      "experienceLevel",
      "endDate",
      "location",
      "type",
      "salary",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
        return false;
      }
    }
    if (formData.skills.length === 0) {
      toast.error("At least one skill is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await createJobAPI(formData);
      toast.success("Job post created successfully!");

      const jobId = response.data.job._id;

      if (formData.candidates.length > 0) {
        const emailResponse = await sendEmailAPI(jobId, formData.candidates);

        if (emailResponse.status === 200) {
          toast.success("Emails sent successfully!");
        } else {
          toast.error("Failed to send emails.");
        }
      }

      setFormData({
        jobTittle: "",
        jobDescription: "",
        experienceLevel: "",
        candidates: [],
        endDate: "",
        location: "",
        type: "",
        salary: "",
        skills: [],
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating job post:", error);
      toast.error("Failed to create job post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl py-10 px-6 pb-20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center">
          <label
            htmlFor="jobTittle"
            className="w-1/3 text-right pr-4 text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTittle"
            name="jobTittle"
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Job Title"
            value={formData.jobTittle}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex">
          <label
            htmlFor="jobDescription"
            className="w-1/3 text-right pt-2 pr-4 text-gray-700"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Job Description"
            value={formData.jobDescription}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="experienceLevel"
            className="w-1/3 text-right pr-4 text-gray-700"
          >
            Experience Level
          </label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.experienceLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Experience Level</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="candidateEmail"
            className="w-1/3 text-right pr-4 text-gray-700"
          >
            Add Candidates
          </label>
          <div className="w-2/3 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-2 p-2 border border-gray-300 rounded-md min-h-[50px]">
              {formData.candidates.map((email) => (
                <div
                  key={email}
                  className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-full"
                >
                  <span>{email}</span>
                  <button
                    type="button"
                    onClick={() => removeEmail(email)}
                    className="text-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                id="candidateEmail"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                value={emailInput}
                onChange={handleEmailChange}
                onKeyDown={(e) => e.key === "Enter" && addEmail(e)}
              />
              <button
                type="button"
                onClick={addEmail}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 hover:scale-105"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="endDate"
            className="w-1/3 text-right pr-4 text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label
            htmlFor="location"
            className="w-1/3 text-right pr-4 text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Job Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="type" className="w-1/3 text-right pr-4 text-gray-700">
            Job Type
          </label>
          <select
            id="type"
            name="type"
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="flex items-center">
          <label
            htmlFor="salary"
            className="w-1/3 text-right pr-4 text-gray-700"
          >
            Salary
          </label>
          <input
            type="text"
            id="salary"
            name="salary"
            className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Salary Range"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-start">
          <label
            htmlFor="skills"
            className="w-1/3 text-right pr-4 pt-2 text-gray-700"
          >
            Skills
          </label>
          <div className="w-2/3 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-2 p-2 border border-gray-300 rounded-md min-h-[50px]">
              {formData.skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-full"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                id="skills"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a skill"
                value={skillInput}
                onChange={handleSkillChange}
                onKeyDown={(e) => e.key === "Enter" && addSkill(e)}
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 hover:scale-105"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Job Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInterview;
