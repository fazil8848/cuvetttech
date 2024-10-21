import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobsAPI } from "../services/apiService";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await getJobsAPI();
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const jobTitleMatch = job.jobTittle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const locationMatch = job.location
      .toLowerCase()
      .includes(locationQuery.toLowerCase());
    return jobTitleMatch && locationMatch;
  });

  return (
    <main className="flex-1 p-8 min-h-screen bg-gray-100">
      <header className="bg-white shadow mt-6 justify-between flex items-center">
        <div className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
        </div>
        <div className="justify-end mr-10">
          <Link
            to="/create-interview"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Job
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for jobs"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                />
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Search
            </button>
          </div>

          <div className="overflow-hidden">
            <ul>
              {filteredJobs.map((job) => (
                <li
                  key={job.id}
                  className="bg-white mb-2 border shadow border-b-slate-400 sm:rounded-md"
                >
                  <div className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-blue-600 truncate">
                          {job.jobTittle}
                        </h3>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {job.postedBy.companyName}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            {job.location}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400">
                            $
                          </p>
                          {job.salary}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <p>
                          Posted {new Date(job.posted).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </main>
  );
};

export default Dashboard;
